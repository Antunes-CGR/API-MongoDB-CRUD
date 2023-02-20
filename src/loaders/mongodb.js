

const mongoose = require("mongoose");
mongoose.set('strictQuery', true)

async function startDB() {
  await mongoose.connect("mongodb+srv://estudos:2rqRYYyekT3Xckce@estudos.ayx1exu.mongodb.net/test");
}

module.exports = startDB;
