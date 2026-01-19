const mongoose = require('mongoose');
const DBConnect = async()=>{
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/zyobitDB");
        console.log(`MongoDB Connected `);
    } catch (error) {
        console.log("DB Connection Error", error);
    }
}


module.exports = DBConnect;