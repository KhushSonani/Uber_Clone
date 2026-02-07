const http = require('http');
const app = require('./app');
require('dotenv').config();
const connectToDb = require('./db/db')

const PORT = process.env.PORT || 3000;
connectToDb();
const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}.`);
})
