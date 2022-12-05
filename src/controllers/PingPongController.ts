import Log from "../helpers/log";

const PingPongController = {
    pingMaster: (socket: any) => {
        socket.emit("ping");
        Log.log("Ping", "I pinged master");
    },
    pongMaster: (socket: any) => {
        socket.emit("pong");
        Log.log("Pong", "Master pinged me & I ponged back");
    },
    gotPongBack: (socket: any) => {
        Log.log("Pong", "Master ponged back");
    },
    whenDisconnected: (socket: any) => {
        Log.log("Disconnect", "Diconnected from the master");
    }
}
export default PingPongController;