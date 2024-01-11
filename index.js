const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

mongoose.connect('connection_string')

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected')
    app.listen(3000, () => console.log('Server started on port 3000'))
})

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error: ', error)
})

app.use('/products', require('./routes/productsRoute'))
app.use('/categories', require('./routes/categoriesRoute'))