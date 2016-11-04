const hapi = require('hapi');
const mongoose = require('mongoose');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 8080,
});

mongoose.connect('mongodb://localhost:27017/test_db');

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
