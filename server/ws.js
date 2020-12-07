/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-11-22 17:11:08
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-04 22:39:09
 */
/***
 * ws -服务器的客户端（服务器充当客户端）
 * const WebSocket = require('ws');
    const ws = new WebSocket('ws://localhost:9000');
    ws.on('open', function open() {
    ws.send('something');
    });
    ws.on('message', function incoming(data) {
    console.log(data);
    });
 * 
 */

// ws 作为服务器
// 导入WebSocket模块:
const WebSocket = require('ws');
// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const wss = new WebSocketServer({
    port: 8500
});

var clientArr=[];

function clientOneSend(message){
    let theMsg = JSON.parse(message);
    var name = '';
    if(theMsg.address){
        name = theMsg.address;
    }
    var clientOne=null;
    for(let i=0;i<clientArr.length;i++){
        if(name == clientArr[i].name){
            clientOne = clientArr[i].ws;
            break;
        }
    }

    
    if(theMsg.msg == 'getAllConn'){
        console.log('getRel:-要结果1234')
        let nameArr=[]
        for(let i=0;i<clientArr.length;i++){
            nameArr.push({
                name: clientArr[i].name
            })
        }
        theMsg.data=nameArr
    }else{
        theMsg.data='connected'
    }
    
    console.log('--newMsg:',theMsg);
    let newMsg = JSON.stringify(theMsg);
    
    clientOne && clientOne.send(newMsg, (err) => {
        if (err) {
            console.log(`[SERVER] error: ${err}`);
        }
    });
}
// websocket 处理连接请求
wss.on('connection', function (ws,req) {
    console.log(`[SERVER] connection()`);
    // console.log('ws:',ws)
    
    // console.log('1clientArr.length：',clientArr.length)
    // console.log('ws.url:',ws.upgradeReq.url);
    // let hasOne=null;
    // let name = ws.upgradeReq.url;
    // for(let i=0;i<clientArr.length;i++){
    //     if(name == clientArr[i].name){
    //         hasOne = true;
    //         break;
    //     }
    // }
    // if(!hasOne){
    //     clientArr.push({
    //         "name": name,
    //         ws
    //     })
    // }
    // console.log('clientArr.length：',clientArr.length)
    // console.log('3clientArr',clientArr)

    // Meteor.bindEnvironment解决办法
    // https://www.javascriptcn.com/read-25933.html
    ws.on('message', 
        async (message)=> {
                console.log(`[SERVER] Received12: ${message}`);
                var args=['user1','hello client--kk-33']
                function runFun(args){
                    return new Promise((res,rej)=>{
                        Meteor.ClientCall.apply('123id', 'testClient', args,(err,rel)=>{
                            // console.log('err,rel:',err,rel);
                            res(rel);
                        })
                    })
                };
                let rel = await runFun(args);
                console.log('rel-123:',rel);
                // clientOneSend(message)
                ws.send(message+'_KK', (err) => {
                    if (err) {
                        console.log(`[SERVER] error: ${err}`);
                    }
                })
            }
        )
    
});

