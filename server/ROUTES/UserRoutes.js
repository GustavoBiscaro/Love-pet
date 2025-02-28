const router = require('express').Router()

const UserController = require('../CONTROLLERS/UserController');

const verifyToken = require('../HELPERS/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, UserController.editUser)

module.exports = router
