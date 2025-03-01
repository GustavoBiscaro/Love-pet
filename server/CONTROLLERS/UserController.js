const User = require('../MODELS/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// helpers

const createUserToken = require('../HELPERS/create-user-token')
const getToken = require('../HELPERS/get-token')
const getUserByToken = require('../HELPERS/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {

        const { name, email, phone, password, confirmpassword } = req.body

        // validações
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória' })
            return
        }

        if (password != confirmpassword) {
            res.status(422).json({ message: 'As senhas não conferem' })
            return
        }

        // checar se user existe
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(422).json({
                message: 'Por favor, utilize outro e-mail',
            })
            return
        }

        // criar senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({
                message: 'Não existe usuário cadastrado neste email',
            })
            return
        }

        // checar se as senhas correspondem
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({
                message: 'Senha inválida!',
            })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {

        let currentUser

        if (req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, 'mysecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)

    }

    static async getUserById(req, res) {

        const id = req.params.id;

        // Verifica se o ID é um ID válido do MongoDB
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                message: 'ID inválido!',
            });
            return;
        }

        try {
            const user = await User.findById(id).select("-password")

            // Se o usuário não for encontrado
            if (!user) {
                res.status(422).json({
                    message: 'Usuário não encontrado!',
                });
                return;
            }

            // Se o usuário for encontrado
            res.status(200).json({ user });

        } catch (error) {
            // Captura qualquer erro durante a busca no banco de dados
            res.status(500).json({
                message: 'Ocorreu um erro no servidor.',
                error: error.message,
            });
        }
    }

    static async editUser(req, res) {
        const id = req.params.id;

        const token = getToken(req)
        const user = await getUserByToken(token);

        const { name, email, phone, password, confirmpassword } = req.body

        let image = ''

        // validando
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        user.name = name

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }

        // CHECAGEM DE EMAIL SE JÁ EXISTIR
        const userExists = await User.findOne({ email: email });

        if (user.email !== email && userExists) {
            res.status(422).json({
                message: 'Por favor, utilize outro e-mail!',
            })
            return
        }
        user.email = email

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória' })
            return
        }

    }
}
