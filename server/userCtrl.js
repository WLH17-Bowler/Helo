module.exports = {
    getUsers: (req, res) => {
        const db = req.app.get('db')

        db.get_users()
        .then(users => res.status(200).send(users))
        .catch(err => console.log(err))
    },

    createPost: (req, res) => {
        const db = req.app.get('db')
        const {title, img, content} = req.body

        // db.create_post(title, img, content)
        db.create_post([title, img, content])
        .then(response => res.sendStatus(200))
        .catch(err => console.log(err))
    }
}