const jwt = require('jsonwebtoken')
const {User} = require('../model/user')


const userAuth = async(req, res, next)=>{
  const token = req.headers['x-auth-token']
  if(!token) return res.status(401).send('Access Desnied. No token provided')

  try{
    const decoded = jwt.verify(token, process.env.SCERET_ACCESS_TOKEN)
    req.user = decoded
    next()
  }catch(e){
    res.status(403).send('Invalid token')
  }
}

module.exports = userAuth