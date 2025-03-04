const router = require('express').Router()

const PetController = require("../CONTROLLERS/PetController")

// middlewares
const verifyToken = require('../HELPERS/verify-token')
const { imageUpload } = require('../HELPERS/image-upload')

router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
router.get("/", PetController.getAll)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet,)


module.exports = router