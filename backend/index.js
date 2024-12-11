const express = require('express');
const app = express();
const { WebSocketServer, CONNECTING } = require('ws');  
const port = 3000; 
const server = app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`); }); 
const wss = new WebSocketServer({ server }); 
wss.on('connection', (ws) =>{ 
    console.log('New client connected'); 
ws.on('message', (message) => { 
    console.log(`Received: ${message}`); 
    ws.send(`You sent: ${message}`); }); 
    ws.on('close', () => {
         console.log('Client disconnected'); 
        }); 
    }); 
 app.get('/', (req, res) => { 
    res.send('WebSocket server is running');
 });