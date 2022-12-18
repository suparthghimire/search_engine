import { Socket } from "socket.io-client";
import Log from "../helpers/log.js";

const PingPongController = {
    pingMaster: (socket: Socket) => {
        socket.emit("ping");
        Log.log("Ping", "I pinged master");
    },
    pongMaster: (socket: Socket) => {
        socket.emit("pong");
        Log.log("Pong", "Master pinged me & I ponged back");
    },
    gotPongBack: (socket: Socket) => {
        Log.log("Pong", "Master ponged back");
    },
    whenDisconnected: (socket: Socket) => {
        Log.log("Disconnect", "Diconnected from the master");
    }
}
export default PingPongController;