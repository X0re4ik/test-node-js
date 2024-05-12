const { MongoError, MongoClient } = require("mongodb");

const {
    mongoDBConfig
} = require("./configs");

const dbClient = new MongoClient(mongoDBConfig.url);
const dbName = mongoDBConfig.name;

/**
 * 
 * @param {MongoClient} client 
 */
const checkDBConnection = async (client) => {
    try {
        await client.connect();
        const db = client.db("admin");
        const result = await db.command({ ping: 1 });
        if (!result.ok) throw MongoError("No connect to mongoDB");
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

/**
 * 
 * @param {MongoClient} client 
 * @returns {Promise<MongoClient>}
 */
const connectToDB = async  () => {
    await dbClient.connect();
    const db = dbClient.db(dbName);
    return db;
}

/**
 * 
 * @param {String} collection 
 */
const connectToDBCollection = async (collection) => {
    const db = await connectToDB();
    return db.collection(collection);
}

module.exports = {
    dbClient,
    checkDBConnection,
    connectToDB,
    connectToDBCollection
}