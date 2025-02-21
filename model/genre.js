const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },
  description:{
    type: String,
    maxlength: 255
  }
})

const Genre = mongoose.model('Genre', genreSchema)

const validateGenre = (genre)=>{
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    description: Joi.string().max(255)
  })
  return schema.validate(genre)
}

module.exports = {Genre, validateGenre}