const mongoose =  require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required '],
        trim:true,
        minLength:[11,"Name  should be lessthan 11"]
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already registered'],
      },
    mobileNumber:{
        type:Number,
        required:true,
        minLength:[10,"mobileNumber should be at least 10 number"],
        unique:true,
        trim:true,
    },
    AddharNumber:{
        type:Number,
        required:true,
        minLength:[12,"Addharnumber  should bs 12 nmber"]
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"password lessthan 7"],
        select:false,

    }
})
userModel.pre('save',async function(next){
if(!this.isModified('password')){
    return  next()
}
this.password = await bcrypt.hashSync(this.password,10)
return next()
})
userModel.methods = {
     jwtToken(){
        return jwt.sign({id:this._id,email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'}

            )
     }

}


module.exports = mongoose.model("User",userModel)