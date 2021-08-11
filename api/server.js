const express = require('express');

const server = express();
const usersRouter = require("../api/users/users-router")

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

const { logger } = require("./middleware/middleware")
server.use(express.json())
server.use('/api/users', logger, usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
