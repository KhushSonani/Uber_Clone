import http from 'http';
import app  from './app.js';
import connectToDb from './db/db.js';

const PORT = process.env.PORT || 3000;
connectToDb();
const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}.`);
})
