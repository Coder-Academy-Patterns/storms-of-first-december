const express = require('express')
const bodyParser = require('body-parser')

const server = express()

// Plugins
server.use(bodyParser.json()) // Allows me to have JSON uploads (POST/PUT/PATCH)

// Routes

// Start the server
server.listen(7000, (error) => {
  console.log('Server started at http://localhost:7000/')
})
