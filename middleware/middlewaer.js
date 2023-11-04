const JWT =require('jsonwebtoken')
require('dotenv').config()

const jwtAuth = (req,res,next)=>{
    const token = (req.cookies && req.cookies.token)||null
    if(!token){
        return res.status(401).json({success:false,message:" token not found"})
    }
    try{
        const payload = JWT.verify(token,process.env.SECRET)
        req.user = {id:payload.id,email:payload.id}

    }catch(e){
        return res.status(401).json({success:false,message:message.e})

    }
    next()
}
module.exports = jwtAuth