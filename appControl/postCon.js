const Post = require('../appModel/postModel')
const User = require('../appModel/userModel')

const post = {
    index(req, res) {
        const findIdentifiers = req.query.authorId ? { author: req.query.authorId } : {};

        Post.find(findIdentifiers)
            .populate('author')
            .lean()
            .then((posts) => {
                res.render('view/mainAppView', { posts: posts })
            })
            .catch((err) => {
                res.send(err.message);
            });
    },
    post(req, res) {
        Post.findById(req.params.id)
            .populate('author')
            .lean()
            .then((post) => {
                res.render('view/mainAppView', post)
            })
            .catch((err) => {
                res.send(err);
            });
    }

}