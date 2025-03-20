const Post = require('../appModel/postModel')
const User = require('../appModel/userModel')

const post = {
    index(req, res) {
        const findIdentifiers = req.query.authorId ? { author: req.query.authorId } : {};

        Post.find(findIdentifiers)
            .populate('author')
            .lean()
            .then((posts) => {
                res.render('layouts/mainAppView', { posts: posts })
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
                res.render('layouts/mainAppView', post)
            })
            .catch((err) => {
                res.send(err);
            });
    },
    create(req, res) {
        const newPost = new Post({ ...req.body, author: res.locals.userId })
        newPost.save()

        User.updateOne(
            { _id: res.locals.userId },
            { $push: { posts: newPost._id } }
        ).catch((err) => {
            res.send(err)
        })
        res.redirect('/mainAppView')
    },
    update(req, res) {
        Post.findByIdAndUpdate(req.params.id,req.body)
        .then((post)=>{
            res.redirect('/mainAppView/' + post._id)
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.id)
          .then(() => {
            User.updateOne(
              { _id: res.locals.userId },
              { $pull: { posts: req.params.id } }
            ).catch((err) => {
              res.send(err);
            });
    
            res.redirect("/mainAppView");
          })
          .catch((err) => {
            res.send(err);
          });
      },
}
module.exports = post