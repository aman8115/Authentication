const User = require("../model/schema.js")
const bcrypt = require('bcrypt')
 const emailvalidator = require('email-validator')

const CreateAccount = async (req, res) => {
    const { name, email, mobileNumber, AddharNumber, password } = req.body;
  
    if (!name || !email || !mobileNumber || !AddharNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
  
        const validEmail = emailvalidator.validate(email);
    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email"
      });
    }
    
  
    try {
      const userInfo = new User(req.body);
      const register = await userInfo.save();
  
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        user: register
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists"
        });
      }
  
      return res.status(400).json({
        message: error.message
      });
    }
  };
  const signIn =  async (req,res)=>{
    const{email,password} = req.body;
    if(!email||!password){
      return  res.status(401).json({
        success:false,
        message:" email and password is required"
      })
    }
    try {
      const user = await User.findOne({email}).select('+password');
      if(!user||!(await bcrypt.compare(password,user.password))){
      return res.status(401).json({
        success:false,
        message:"  invalid passwrod "
      })
      }
      const token = user.jwtToken()
      user.password = undefined;
      const cookieOption = {
        maxAge:24*60*60*1000,
        httpOnly:true,
      
      }
      res.cookie('token', token,cookieOption)
      return res.status(200).json({
        success:true,
        message:" user log in successfully",
        
      })

      
    } catch (error) {
      return res.status(401).json({
        success:false,
        message:" user not login successfully"
      })
      
    }
  }
  const getUser =  async (req,res, next)=>{
    const userID = req.user.id
   try {
    const userData =  await User.findById(userID)
    res.status(200).json({
      success:true,
      message:" User print successfully ",
      user:userData
    })
   } catch (error) {
    console.log(error)
    res.status(401).json({
      success:false,
      message:" your information not exist in database "
    })
    
   }
   next()

  
  }
  const logOut = (req,res)=>{
  try{
    const cookieOption = {
      expiresIn: new Date(),
      httpOnly:true
    }
    res.cookie('token',null,cookieOption)
    res.status(200).json({success:true,Mesage:" user logout"})
    }catch(e){
      res.status(400).json({success:false,message:message.e})

    }
  }






  
module.exports = {
CreateAccount,
signIn,
getUser,
logOut


}