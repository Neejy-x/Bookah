const express = require('express')
const router = express.Router()
const {Genre, validateGenre} = require('../model/genre')
const userAuth = require('../middleware/userAuth')
const adminAuth = require('../middleware/adminAuth')


router.get('/', [userAuth, adminAuth], async(req, res)=>{
  const genres= await Genre.find()
  res.send(genres)
})


router.post('/', [userAuth, adminAuth], async(req, res)=>{
  const {error} = validateGenre(req.body)
  if(error) return error.details[0].message
  const genre = new Genre({
    name: req.body.name,
    description: req.body.description
  })
  await genre.save()
  res.status(201).send({message: 'Successfully Created: ', genre})
})


router.delete('/:id', [userAuth, adminAuth], async(req, res)=>{
  const genre = await Genre.findByIdAndDelete(req.params.id)
  if(!genre) return res.status(404).send('Genre not found')

  res.send(genre)
})

module.exports = router
