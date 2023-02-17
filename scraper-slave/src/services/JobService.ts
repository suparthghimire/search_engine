import { Browser, HTTPResponse, Page } from "puppeteer";

const JobService = {
    scrape: async (page: Page, job: any) => {
        interface Idata {
            title: string | null;
            description: string | null;
            keywords: string | null;
            links: string[] | null;
            content: string | null;
            html: string | null;
            statusCode: null | any;
        }
        let data: Idata = {
            title: null,
            description: null,
            keywords: null,
            links: [],
            content: null,
            html: null,
            statusCode: null,
        };
        let response = await page.goto(job.url, { waitUntil: 'load', timeout: 0 });

        data.title = await page.evaluate(() => document.title || null);
        data.description = await page.evaluate(() => document.querySelector('meta[name="description"]')?.getAttribute("content") || null);
        data.keywords = await page.evaluate(() => document.querySelector('meta[name="keywords"]')?.getAttribute("content") || null);
        data.links = await page.$$eval('a', (elements) => elements.map((e) => e.href));
        data.content = await page.evaluate(() => document.body.innerText);
        data.html = await page.content();
        data.statusCode = response?.status();

        return data;
    }
}

export default JobService;