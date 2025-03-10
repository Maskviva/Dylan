import WebSocket from 'ws';

import getDataBasePoolConfig from "../../config"

// 创建 WebSocket 服务器
let wss: WebSocket.Server;

/**
 * 初始化 WebSocket 服务器
 */
export async function initRunChatRoom() {
    wss = new WebSocket.Server({
        port: (await getDataBasePoolConfig())['WebSocket']['ChatRoom']['port'], perMessageDeflate: { // 启用消息压缩
            zlibDeflateOptions: {level: 3}
        }
    });
}

/**
 * 启动 WebSocket 服务器
 * @constructor
 */
export function RunChatRoom() {
    // 监听连接事件
    wss.on('connection', (ws, request) => {
        console.log(`客户端已连接，IP: ${request.socket.remoteAddress}`);

        // 接收消息
        ws.on('message', (data) => {
            console.log('收到消息:', data.toString());

            // 广播消息给所有客户端
            wss.clients.forEach((client: { readyState: any; send: (arg0: string) => void; }) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(`${data}`);
                }
            });
        });

        // 错误处理
        ws.on('error', (error) => {
            console.error('WebSocket 错误:', error);
        });

        // 连接关闭
        ws.on('close', () => {
            console.log('客户端断开连接');
        });
    });

    console.log('WebSocket 服务器已启动');
}