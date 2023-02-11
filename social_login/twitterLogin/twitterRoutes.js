const express = require('express')
const router  = express.Router()

const twitterLoginSuccess = async (req,res)=>{
    res.send('this is twitter login sucess route')
}


module.exports = router