import Log from "../helpers/log";
import JobService from "../services/JobService";

const PingPongController = {
    pingClient: (client: any) => {
        client.emit("ping");
        Log.log("Ping", "I pinged client : " + client.id);
    },
    pongClient: (client: any) => {
        client.emit("pong");
        Log.log("Pong", "Client " + client.id + " pinged me & I ponged back");
    },
    gotPongBack: (client: any) => {
        Log.log("Pong", "Client " + client.id + " ponged back");
    },
    whenDisconnected: (client: any) => {
        Log.log("Disconnect", "Client " + client.id + " disconnected");
        // Release the abandoned jobs
        JobService.releaseAllReservedJobByAgentId(client.id);
    }
}
export default PingPongController;