'use strict';
const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://joshua:Gyz2Rv2xsLAmV1yf@mediconnectcluster.5wortwl.mongodb.net/?appName=mediconnectcluster';

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });

  isConnected = true;
  return mongoose.connection;
}

module.exports = {
  connectToDatabase
};

