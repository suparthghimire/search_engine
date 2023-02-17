import puppeteer, { Browser } from "puppeteer";
import { Socket } from "socket.io-client";
import Log from "../helpers/log.js";
import JobService from "../services/JobService.js";

import dotenv from "dotenv"
dotenv.config()

const WAIT_INTERVAL_TIME = Number(process.env.WAIT_INTERVAL_TIME) * 1000 || 10 * 1000 // 10 seconds
let isWaiting = false;
const JobController = {
    requestJob: async (socket: Socket) => {
        Log.log("Job Request", "New job requested");
        socket.emit("job");
    },
    gotJob: async (socket: Socket, browser: Browser, job: any) => {
        if (job) {
            job.clientStart = new Date();
            Log.log("Yes Job", "Got a new valid job : " + job.url);
            isWaiting = false;
            let page = await browser.newPage();
            try {
                let data = await JobService.scrape(page, job);

                if (data && data.statusCode === 200) {
                    // Removing the redundant urls from the data.links
                    data.links = [...new Set(data.links)]

                    job.clientEnd = new Date();
                    Log.log("Fetch Success", (job.clientEnd - job.clientStart) + " ms - " + data.statusCode + " : " + job.url);
                    Log.log("Job Submit", socket.id + " submitting the job with data");
                    socket.emit("submit", { job, data });
                }
                else {
                    Log.log("Fetch Failed", data.statusCode + " : " + job.url);
                    Log.log("Job Submit", socket.id + " submitting the job with null");
                    socket.emit("submit", { job, data: null })
                }
            } catch (error) {
                Log.log("Error", error)
                Log.log("Fetch Failed", "Fetched url :" + job.url);
                Log.log("Job Submit", socket.id + " submitting the job with null");
                socket.emit("submit", { job, data: null })
            }
            finally {
                await page.close();
            }
        }
        else {
            Log.log("No Job", "Didn't get a new valid job");
            isWaiting = true;
        }
        return
    },
    availableJob: async (socket: Socket) => {
        isWaiting && await JobController.requestJob(socket);
    }
}

export default JobController;