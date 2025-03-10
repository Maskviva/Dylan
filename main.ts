import app from './src/main/app';
import {initRunChatRoom, RunChatRoom} from "./src/main/services/WebSocket/websocket.chatroom.service";

initRunChatRoom().then(() => {
    RunChatRoom()
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000/');
})