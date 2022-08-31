import { io, Socket } from "socket.io-client";

const socket = io(`${process.env.HOST_NAME}:${process.env.PORT}`);

export default socket;
