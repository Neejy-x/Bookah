const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const{User, validateUser} = require('../model/user')



router.get('/', (req, res)=>{
 const users = User.find()
 res.send(users)
})

router.post('/register', async(req, res)=>{
  const{name, email, password, isAdmin} = req.body
  const {error} = validateUser(req.body)
  if(error) return res.status(400).send(error.details[0].message)
  
  const user = new User({
    name: name,
    email: email,
    password: await bcrypt.hash(password, 10),
    isAdmin: isAdmin
  })
  await user.save()
  res.sendStatus(201).send('User successfully created', user)
})



router.post('/auth', async(req, res)=>{
  const {email, password} = req.body


  const user = await User.findOne({email})
  if(!user) return res.status(400).send(('Invalid Username or Password'))
  
  const validPassword = await bcrypt.compare(password, user.password)
  if(!validPassword) return res.status(400).send('Invalid Username or Password')
  
  const token = user.genreateAuthToken()
  res.headersSent('x-auth-token', token).send(`Welcome ${user.name}`, user)
})