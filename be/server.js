const express = require('express');
const path = require('path'); // ?
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
const config = require('./config/configs');

// Use Node's default promise instead of Mongoose's promise libraryOO
mongoose.Promise = global.Promise;

// mongoose.connect(config.db)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.DB, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
connectDB()

let db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to the database.');
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Instantiate expressyy
const app = express();

// Don't touch this if you don't know it
// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy', "127.0.0.1");
app.enable('trust proxy');

// Set public folder using built-in express.static middleware
app.use(express.static('public'));

// use ungl
// app.use(express.json())
// app.use(bodyParser.urlencoded({ extend: false }))
// Set body parser middleware
app.use(bodyParser.json());

// Enable cross-origin access through the CORS middleware
// NOTICE: For React development server only! g

app.use(
  cors(
    //   {
    //   allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    //   exposedHeaders: ["authorization"], // you can change the headers
    //   origin: "*",
    //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   preflightContinue: false
    // }
  )
);

// Initialize routes middleware
app.use('/api/users', require('./routes/users'));

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

// Start the server
const port = process.env.PORT || 3000;
console.log(process.env.port)
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Set up socket.io
const io = socket(server, {
  cors: {
    origin: config.react_app_url,
  }
});
let online = 0;

io.on('connection', (socket) => {
  online++;
  console.log(`Socket ${socket.id} connected.`);
  console.log(`Online: ${online}`);
  io.emit('visitor enters', online);

  socket.on('add', data => socket.broadcast.emit('add', data));
  socket.on('update', data => socket.broadcast.emit('update', data));
  socket.on('delete', data => socket.broadcast.emit('delete', data));

  socket.on('disconnect', () => {
    online--;
    console.log(`Socket ${socket.id} disconnected.`);
    console.log(`Online: ${online}`);
    io.emit('visitor exits', online);
  });
});