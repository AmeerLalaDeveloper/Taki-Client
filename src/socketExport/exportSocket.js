import io from "socket.io-client";
//'https://taki-socket.herokuapp.com' ||
const connectionOptions = {
  forceNew: true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const ENDPOINT = "https://taki-socket-ameer.com";
export default io(ENDPOINT, connectionOptions);
