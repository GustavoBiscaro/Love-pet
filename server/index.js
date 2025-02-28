const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON reponse
app.use(express.json())

// Solve Cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public Folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./ROUTES/UserRoutes')

app.use('/users', UserRoutes)

app.listen(5000)
