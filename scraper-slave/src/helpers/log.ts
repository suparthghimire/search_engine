import fs from "fs";
let date;

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs')
}

const Log = {
    log: (type: string, msg: any) => {
        if (process.env.NODE_ENV === "production") {
            date = new Date;
            fs.appendFileSync('./logs/log.txt', date + " : \n" + type + " ==> " + JSON.stringify(msg) + "\n");
            console.log(date + " : \n" + type + " ==> " + msg)
        } else {
            fs.appendFileSync('./logs/log.txt', type + " ==> " + JSON.stringify(msg) + "\n");
            console.log(type + " ==> " + msg)
        }
    }
}

export default Log;