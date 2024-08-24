const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/social-media-tracker');
        console.log(`MongoDb connected : ${conn.connection.host}`);
    }catch(err){
        console.error(`Eroor : ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect('mongodb+srv://Satish-P3:9250@SASp_mongo@cluster0.tig8f4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/MP');
//     console.log(`MongoDb connected : ${conn.connection.host}`);
//   } catch (err) {
//     console.error(`Error : ${err.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;