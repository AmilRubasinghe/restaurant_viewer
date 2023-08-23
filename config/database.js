const { Sequelize, cast } = require("sequelize");

const { APPLICATION } = require("./config");

const PORT = APPLICATION.DB_PORT;
const HOST = APPLICATION.DB_HOST;
const USER = APPLICATION.DB_USERNAME;
const database = APPLICATION.DB_NAME;
const PASSWORD = APPLICATION.DB_PASSWORD;

const connections = [];

const connect = () => {
  const oldConnection = connections.find((c) => c.database === database);

  if (oldConnection) return cast(oldConnection.conn, "Sequelize").val;

  const connection = new Sequelize(database, USER, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: "mysql",
    logging: false,
  });

  connections.push({
    database: database,
    // dbURL: dbURL,
    conn: connection,
  });

  connection
    .authenticate()
    .then(() => {
      console.log(`Connection has been established successfully. ${database}`);
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });

  return connection;
};

module.exports = {
  connect: connect,
};
