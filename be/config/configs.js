// Set the connection string based from the config vars of the production server
// To run locally use 'mongodb://localhost/mern-crud' instead of process.env.DB

module.exports = {
  // db: process.env.DB,
  db: "mongodb://103.77.242.64:27017/mern",
  // db: "mongodb://0.0.0.0:27017/mern",
  // db: "mongodb://localhost/mern-crud",
  react_app_url: "http://localhost"
};
