const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const {errorHandler, logger} = require('./middleware/errorHandler')



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