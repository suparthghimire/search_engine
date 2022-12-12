/* Standard Libraries Start */
import ioClient from "socket.io-client"
import dotenv from "dotenv"
dotenv.config()
/* Standard Libraries End */

/* Custom Libraries Start */
import Log from "./helpers/log";
import PingPongController from "./controllers/PingPongController";
import JobController from "./controllers/JobController";
/* Custom Libraries End */

/* Custom Configurations Start */
const MASTER_URL = process.env.MASTER_URL || "http://localhost:6000";
const socket = ioClient(MASTER_URL, {
    path: '/'
});

/* Custom Configurations End */

socket.on('connect', () => {
    Log.log('Connect', `Connected to Master with id :${socket.id}`);

    PingPongController.pingMaster(socket);
    socket.on('ping', () => PingPongController.pongMaster(socket));
    socket.on('pong', () => JobController.requestJob(socket));
    socket.on('dispatch_ready', () => JobController.availableJob(socket))
    socket.on('dispatch', (job) => JobController.gotJob(socket, job))
    socket.on('processed', () => JobController.requestJob(socket))
    socket.on('disconnect', () => PingPongController.whenDisconnected(socket));
});