/* Standard Libraries Start */
import ioClient from "socket.io-client"
import dotenv from "dotenv"
dotenv.config()
/* Standard Libraries End */

/* Custom Libraries Start */
import Log from "./helpers/log";
import PingPongController from "./controllers/PingPongController.js";
import JobController from "./controllers/JobController.js";
import puppeteer, { Browser } from "puppeteer";
/* Custom Libraries End */

/* Custom Configurations Start */
const MASTER_URL = process.env.MASTER_URL || "http://localhost:6000";
const socket = ioClient(MASTER_URL, {
    path: '/'
});

(async () => {
    const browser: Browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
        ignoreDefaultArgs: ['--disable-extensions'],
        // executablePath: "/usr/bin/chromium-browser"
    });
    /* Custom Configurations End */

    socket.on('connect', () => {
        Log.log('Connect', `Connected to Master with id :${socket.id}`);

        PingPongController.pingMaster(socket);
    });

    socket.on('ping', () => PingPongController.pongMaster(socket));
    socket.on('pong', () => JobController.requestJob(socket));
    socket.on('dispatch_ready', () => JobController.availableJob(socket))
    socket.on('dispatch', (job) => JobController.gotJob(socket, browser, job))
    socket.on('processed', () => JobController.requestJob(socket))
    socket.on('disconnect', () => PingPongController.whenDisconnected(socket));

    process.on("exit", () => {
        console.log("Closing browser")
        browser.close()
    })
})()

