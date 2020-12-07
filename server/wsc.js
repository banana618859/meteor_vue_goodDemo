/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-12-06 09:09:22
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-06 09:19:12
 */
// 导入WebSocket模块:
const WebSocket = require('ws');
// 引用Server类:
// console.log('WebSocket:',WebSocket)
const WebSocketServer = WebSocket.Server;
var ws = new WebSocket("ws://localhost:8000/echo");
if(!ws){return}
				ws.onopen = function (e) {
				    console.log('open:',Date.now())
					console.log('connection to server opened')
					var obj={
						name: 'kk',
						msg: 'hello12 word--meteor-client'
					}
					ws.send(JSON.stringify(obj))
				}
				

				ws.onmessage = function(event) {
					let data = event.data
					console.log("data",data)

				}
// 原文链接：https://blog.csdn.net/yexudengzhidao/article/details/92846600