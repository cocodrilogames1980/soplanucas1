// Servidor mínimo para partidas en línea.
// Ejecutar con: npm install && npm start
const http=require('http');
const fs=require('fs');
const path=require('path');
const WebSocket=require('ws');
const PORT=process.env.PORT||3000;
const ROOT=__dirname;
const rooms=new Map();
function code(){let s='';const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';do{s='';for(let i=0;i<6;i++)s+=chars[Math.floor(Math.random()*chars.length)]}while(rooms.has(s));return s}
const server=http.createServer((req,res)=>{
 let p=req.url.split('?')[0]; if(p==='/')p='/index.html'; const file=path.join(ROOT,p);
 if(!file.startsWith(ROOT)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}const ext=path.extname(file);const types={'.html':'text/html; charset=utf-8','.png':'image/png','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8'};res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)})
});
const wss=new WebSocket.Server({server});
function send(ws,obj){if(ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify(obj))}
function broadcast(room,obj){room.players.forEach(p=>send(p.ws,obj))}
wss.on('connection',ws=>{
 ws.room=null;ws.player=null;
 ws.on('message',raw=>{
  let m;try{m=JSON.parse(raw)}catch{return}
  if(m.type==='create'){
   if(ws.room)return;const c=code();const room={code:c,size:[3,4,5].includes(+m.size)?+m.size:3,players:[{ws,player:0}]};rooms.set(c,room);ws.room=room;ws.player=0;send(ws,{type:'created',code:c,size:room.size,player:0});return;
  }
  if(m.type==='join'){
   const room=rooms.get(String(m.code||'').toUpperCase());if(!room)return send(ws,{type:'error',message:'Sala no encontrada.'});if(room.players.length>=2)return send(ws,{type:'room_full'});if(+m.size!==room.size)return send(ws,{type:'error',message:`Esta sala usa tablero ${room.size}×${room.size}.`});ws.room=room;ws.player=1;room.players.push({ws,player:1});room.players.forEach(p=>send(p.ws,{type:'ready',code:room.code,size:room.size,player:p.player}));return;
  }
  if(m.type==='move'&&ws.room){broadcast(ws.room,{type:'move',i:m.i,p:m.p,next:m.next});return}
  if(m.type==='result'&&ws.room){broadcast(ws.room,m);return}
 });
 ws.on('close',()=>{if(ws.room){const room=ws.room;room.players=room.players.filter(p=>p.ws!==ws);if(room.players.length===0)rooms.delete(room.code);else send(room.players[0].ws,{type:'error',message:'El rival se desconectó.'})}});
});
server.listen(PORT,()=>console.log(`Sopla nucas online en http://localhost:${PORT}`));
