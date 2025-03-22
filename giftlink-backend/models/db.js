// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Task 1: Connect to MongoDB
        await client.connect();

        // Task 2: Connect to database giftdb and store in variable dbInstance
        dbInstance = client.db(dbName);

        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }

    // Task 3: Return database instance
    return dbInstance;
}

module.exports = connectToDatabase;

