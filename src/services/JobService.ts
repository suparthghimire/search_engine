import { Browser, HTTPResponse } from "puppeteer";

const JobService = {
    scrape: async (browser: Browser, job: any) => {
        let page = await browser.newPage();
        interface Idata {
            title: string | null;
            description: string | null;
            keywords: string | null;
            links: string[] | null;
            content: string | null;
            html: string | null;
        }
        let data: Idata = {
            title: null,
            description: null,
            keywords: null,
            links: [],
            content: null,
            html: null
        };
        await page.goto(job.url, { waitUntil: 'networkidle2' });

        data.title = await page.evaluate(() => document.title || null);
        data.description = await page.evaluate(() => document.querySelector('meta[name="description"]')?.getAttribute("content") || null);
        data.keywords = await page.evaluate(() => document.querySelector('meta[name="keywords"]')?.getAttribute("content") || null);
        data.links = await page.$$eval('a', (elements) => elements.map((e) => e.href));
        data.content = await page.evaluate(() => document.body.innerText);
        data.html = await page.content();

        await page.close();
        return data;
    }
}

export default JobService;