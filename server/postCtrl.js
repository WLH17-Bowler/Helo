module.exports = {
    getUsers: (req, res) => {
        const db = req.app.get('db')
        db.get_users()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send(err))
    },

    createPost: (req, res) => {
        const db = req.app.get('db')
        const {title, img, content} = req.body

        db.create_post([title, img, content])
        .then(posts => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    
    getPosts: (req, res) => {
        const db = req.app.get('db')

        db.get_posts()
        .then(homefeed => res.status(200).send(homefeed))
        .catch(err => res.status(500).send(err))
    },

    getMine: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.get_mine(id)
        .then(myPosts => res.status(200).send(myPosts))
        .catch(err => res.status(500).send(err))
    },

    deletePost: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.delete(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}