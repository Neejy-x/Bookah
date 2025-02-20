const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    maxlength: 75
  },
  email:{
    type: String,
    required: true,
    unique: true,
    maxlenght: 255
  },
  password:{
    type: String,
    required: true,
    minlength: 8,
    maxlenght: 255
  },
  isAdmin:{
    type: Boolean,
    default: false,
    required: true
  }
})

userSchema.methods.genrateAuthToken = function(){
  return jwt.sign({_id: this._id, name: this.name, isAdmin: this.isAdmin}, process.env.SECRET_ACCESS_TOKEN)
}

const User = mongoose.model('User', userSchema)

const validateUser = (user)=>{
const schema = Joi.object({
  name: Joi.string().required().max(75),
  email: Joi.string().required().max(255).email(),
  password: Joi.string().required().min(8).max(255),
  isAdmin: Joi.boolean().required()
})
return schema.validate(user, {abortEarly: false}) 
}

module.exports = {User, validateUser}
