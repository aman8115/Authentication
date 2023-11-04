const express = require("express")
const{ CreateAccount,signIn,getUser, logOut,} = require("../controller/controller.js")
const jwtAuth = require("../middleware/middlewaer.js")
const router = express.Router()
router.post('/rgister',CreateAccount)
router.post('/signin',signIn)
router.get('/get',jwtAuth,getUser )
router.get('/logout',jwtAuth,logOut)

module.exports = router