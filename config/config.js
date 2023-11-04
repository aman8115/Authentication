const mongoose = require("mongoose")
require('dotenv').config()
const DatabaseConnection = async()=>{
    mongoose.connect(process.env.MONGOURL)
    .then((conn)=>{
        console.log(`Database has connected ${conn.connection.host}`)
    })
    .catch((error) =>{
        console.log(` Database is could not connect ${error}`)
    })
}
module.exports = DatabaseConnection 
