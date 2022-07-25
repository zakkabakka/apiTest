const express = require('express');
const server = express();
const routeApi = require('./routes/ApiRoutes').router;

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use('/api/', routeApi);


server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h2>HELLO SERVER</h2>')
})

server.listen(3000, () => {
    console.log('server starting on 3000')
})