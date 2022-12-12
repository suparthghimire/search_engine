import mysql, { MysqlError } from "mysql";

import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

// Make a new connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password'
});

// Connect to database
connection.connect();

// Make "export" directory if not exists
if (!fs.existsSync('export')) {
    fs.mkdirSync('export')
}

connection.query('select * from scraper.Job;', function (err: MysqlError, results: any, fields: any) {
    // If error, throw
    if (err) throw err;

    // Define storage path
    const STORAGE_PATH = "./storage/"

    // Filter all rows where status="done"
    let onlyDone = results.filter((d: any) => {
        return d.status === "done" ? true : false;
    })

    // Combine data with metadata
    const dataWithLinks = onlyDone.map((item: any) => {
        const jsonPath = path.join(
            STORAGE_PATH,
            item.contentHashId,
            item.contentHashId + ".json"
        );
        try {
            const json = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
            return {
                ...item,
                metadata: {
                    url: json.url,
                    title: json.title,
                    description: json.description,
                    keywords: json.keywords,
                    links: removeDuplicates(json.links)
                },
            };
        } catch (e) { }
    });

    try {
        // Export to json
        fs.writeFile('export/table.json', JSON.stringify(dataWithLinks), function (err: any) {
            // If error, throw
            if (err) throw err;
            console.log('JSON Exported');

            // New zip instance
            const zip = new AdmZip();
            // Add table.json(main file)
            zip.addLocalFile("./export/table.json");
            dataWithLinks.forEach((e: any) => {
                zip.addLocalFolder("./storage/" + e.contentHashId, e.contentHashId);
            });
            zip.writeZip("./export/data.zip");
            console.log("Content Archieved");
        });
    } catch (err) {
        console.log(err)
    }
    connection.end();
});

function removeDuplicates(arr: any) {
    return arr.filter((item: any, index: number) => arr.indexOf(item) === index);
}