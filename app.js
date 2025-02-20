require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/users')
const {errorHandler, logger} = require('./middleware/errorHandler')
const app = express()


app.use(express.json())
app.use('/api/users', users)
app.use(express.static('public'))
app.use(errorHandler)

const PORT = process.env.PORT || 4321






mongoose.connect('mongodb://localhost:27017/bookaholic')
.then(()=>{
  logger.info('Connected to MongoDB')
})
.catch(err=>err.message)





app.get('/', (req, res)=>{

})

app.listen(PORT, ()=>{
  logger.info(`Server is running on PORT ${PORT}`)
})