const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        let foundUser = await db.check_user(username)
        console.log(req.body)
        if (foundUser[0]) {
            return res.status(400).send(`Username ${username} already in use`)
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let newUser = await db.register(username, hash)
        // let userProfile = await db.create_profile(newUser[0].user_id)
        let sessionUser = {...newUser[0]}

        req.session.user = sessionUser
        res.status(201).send(req.session.user)
    },

    login: async(req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        let foundUser = await db.check_user(username)

        if (!foundUser[0]) {
            return res.status(400).send(`Username ${username} not found`)
        }

        const authorized = bcrypt.compareSync(password, foundUser[0].password)

        if (!authorized) {
            return res.status(401).send('Incorrect password')
        }

        delete foundUser[0].password
        req.session.user = foundUser[0]
        res.status(202).send(req.session.user)
    },
    
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}