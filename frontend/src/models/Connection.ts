export interface Connection {
    room: String,
    username: String,
    socket: SocketIOClient.Socket
}