/**
 * MittiMart MongoDB Connection Config
 * Allows production connectivity via Mongoose to MongoDB Atlas or local MongoDB.
 */

const mongoose = require('mongoose');

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mittimart';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MittiMart DB] MongoDB Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MittiMart DB] MongoDB Connection Warning: ${error.message}`);
    console.warn(`[MittiMart DB] Continuing with high-performance embedded JSON/SQLite store for zero-setup demo.`);
    return false;
  }
};

module.exports = connectMongoDB;
