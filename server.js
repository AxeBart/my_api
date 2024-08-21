import express from 'express'
import cors from 'cors'
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors({
    {
    origin: "*"
    methods: {"POST", "GET", "DELETE", "PUT"},
    credentials: true
  }
}))
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Autorise toutes les origines
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.emit('info', 'vous etes '+socket.id)
})


app.get('/test', (req, res) => {
    res.send({reponse : 'api sqlit fonctionnel'})
    res.end()
})

server.listen(process.env.PORT || 3000, () => {
    console.log(`started`);
});
