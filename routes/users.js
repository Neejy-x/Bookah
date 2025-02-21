const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const _ = require('lodash')
const userAuth = require('../middleware/userAuth')
const adminAuth = require('../middleware/adminAuth')
const{User, validateUser} = require('../model/user')



router.get('/', [userAuth, adminAuth], (req, res)=>{
 const users = User.find()
 res.send(users)
})



router.post('/register', async(req, res)=>{
  const{name, email, password} = req.body

  const {error} = validateUser(req.body)
  if(error) return res.status(400).send(error.details.map(err => err.message))
  
  const user = new User({
    name: name,
    email: email,
    password: await bcrypt.hash(password, 10),
  })
  await user.save()
  const __ = _.pick(user, ['name', 'email'])

  res.status(201).send({message: 'Signup Successful ', __})
})



router.post('/auth', async(req, res)=>{
  const {email, password} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(400).send(('Invalid Username or Password'))
  
  const validPassword = await bcrypt.compare(password, user.password)
  if(!validPassword) return res.status(400).send('Invalid Username or Password')
  
  const token = user.genrateAuthToken()
  const signedIn = _.pick(user, ['name', 'email'])
  res.header('x-auth-token', token).send({message: `Welcome ${user.name}`, signedIn})
})



router.post('/:id/admin', [userAuth, adminAuth], async(req, res)=>{
  const {id} = req.params.id
  const user = await User.findById(id)
  user.isAdmin = true
  await user.save()
})

router.delete('/:id', [userAuth, adminAuth], async(req, res)=>{
const user = await User.findByIdAndDelete(req.params.id)
if(!user) return res.status(404).send('User not found')

res.send('User Successfully deleted', user)
})


module.exports = router