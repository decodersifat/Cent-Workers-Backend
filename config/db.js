import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ Missing MONGODB_URI environment variable. Set it in your .env file.");
}


const client = new MongoClient(uri, {

  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

let db; 

async function connectDB() {
  if (!uri) return;
  try {
    
    await client.connect();

    db = client.db(process.env.MONGODB_DB_NAME);


    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB connection established and ping successful.");
  } catch (err) {

    if (err.name === 'MongoNetworkError') {
      console.error("❌ Network/TLS error while connecting to MongoDB:", err);
    } else {
      console.error("❌ DB Connection Failed:", err);
    }
  }
}

export { db, client };
export default connectDB;