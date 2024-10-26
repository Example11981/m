// Set the connection string based from the config vars of the production server

module.exports = {
  // db: process.env.DB,
  DB: process.env.DB || "mongodb://127.0.0.1:27017/mern-crud",
  // db: "mongodb://0.0.0.0:27017/mern",
  // db: "mongodb://localhost/mern-crud",
  // react_app_url: "http://127.0.0.1:4200",
  react_app_url: process.env.react_app_url || "/"

};
