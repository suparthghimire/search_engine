import puppeteer, { Browser } from "puppeteer";
import { Socket } from "socket.io-client";
import Log from "../helpers/log";
import JobService from "../services/JobService";

import dotenv from "dotenv"
dotenv.config()

const WAIT_INTERVAL_TIME = Number(process.env.WAIT_INTERVAL_TIME) * 1000 || 10 * 1000 // 10 seconds
let isWaiting = false;
const JobController = {
    requestJob: async (socket: Socket) => {
        Log.log("Job Request", "New job requested");
        socket.emit("job");
    },
    gotJob: async (socket: Socket, job: any) => {
        if (job) {
            job.clientStart = new Date();
            Log.log("Yes Job", "Got a new valid job");
            isWaiting = false;
            const browser: Browser = await puppeteer.launch({ headless: true });
            try {
                let data = await JobService.scrape(browser, job);

                if (data) {
                    job.clientEnd = new Date();
                    Log.log("Fetch Success", "Fetched url :" + job.url + " in " + (job.clientEnd - job.clientStart) + " ms");
                    socket.emit("submit", { job, data });
                }
            } catch (error) {
                console.log(error)
                Log.log("Fetch Failed", "Fetched url :" + job.url);
                socket.emit("submit", { job, data: null })
            }
            await browser.close()
        }
        else {
            Log.log("No Job", "Didn't get a new valid job");
            isWaiting = true;
        }
    },
    availableJob: async (socket: Socket) => {
        isWaiting && await JobController.requestJob(socket);
    }
}

export default JobController;