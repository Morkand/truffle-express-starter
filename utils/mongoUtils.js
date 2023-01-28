const mongoose = require("mongoose");
require('dotenv').config();
const { MONGOUSER, MONGOPASS, MONGODB } = process.env;

module.exports = {

  getMongo:async function () {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(`mongodb://127.0.0.1:27017/${MONGODB}`, {
        authSource: 'admin',
        auth: { username: MONGOUSER, password: MONGOPASS },
      })
      const db =  await mongoose.connection;
      return db;
    } catch (error) {
      return false;
    }
  }

}