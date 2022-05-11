const mongoose = require('mongoose');
require('colors');

const connectDB= async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.green.inverse)
    } catch (error) {
        console.error(`${error}`.red.inverse)
;        process.exit(1)
    }
}

module.exports = connectDB;