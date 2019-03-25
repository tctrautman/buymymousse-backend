require('dotenv').config({ path: '.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// To do: use express middleware to handle cookies (JWT)
// To do: us express middleware to populate current user

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },   
}, serverInfo => {
    console.log(`Server is now running on port http://localhost:${serverInfo.port}`);
});
