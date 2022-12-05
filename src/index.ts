/* Standard Libraries Start */
const server = require('http').createServer();
import dotenv from "dotenv"
dotenv.config()
/* Standard Libraries End */

/* Custom Libraries Start */
import Log from "./helpers/log";
import PingPongController from "./controllers/PingPongController";
/* Custom Libraries End */

/* Custom Configurations Start */
const PORT = process.env.PORT || 6000;
const io = require('socket.io')(server, {
    path: '/'
});
/* Custom Configurations End */

io.on('connection', (client: any) => {
    Log.log('Connect', 'Client Connected : ' + client.id);

    PingPongController.pingClient(client);
    client.on('ping', () => PingPongController.pongClient(client));
    client.on('pong', () => PingPongController.gotPongBack(client));
    client.on('disconnect', () => PingPongController.whenDisconnected(client));
});

(async () => {
    try {
        let startFinished = false;
        await new Promise((resolve, reject) => {
            server.listen(PORT, () => {
                if (!startFinished) {
                    startFinished = true;
                    Log.log('Info', "Server running at port : " + PORT)
                    resolve(PORT);
                }
            });
            server.once('error', (err: any) => {
                if (!startFinished) {
                    startFinished = true;
                    reject(err);
                }
            });
        });
    } catch (e) {
        Log.log('Error', 'There was an error starting the server:' + e);
    }
})()