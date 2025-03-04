const express = require('express')
const cors = require('cors')

const app = express()

// CORS
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// IMAGENS
app.use(express.static('public'))

// ROTAS
const UserRoutes = require('./ROUTES/UserRoutes');
const PetRoutes = require('./ROUTES/PetRoutes');

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)
