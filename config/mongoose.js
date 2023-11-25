require("dotenv").config()

// const { MongoClient, ServerApiVersion } = require('mongodb');
const url = process.env.MONGO_URL;
//const uri = 'mongodb://127.0.0.1:27017/SkilllAuth'

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


const mongoose = require('mongoose')
// mongoose.connect("mongodb://localhost:27017/Habit_Tracker");
// mongoose.connect(process.env.mongoDBAtlas)

mongoose.connect(url)

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting Database"));
db.once('open',function(){
    console.log("Successfully Connected to Database!!");
});

module.exports = db;