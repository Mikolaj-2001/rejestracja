const express = require('express')
const routing = express.Router()

const userController = require('../appControl/userCon')
const postController = require('../appControl/postCon')

router.get('/mainAppView', (_req, res) => {
    res.render('layouts/mainAppView')
});
router.post('/mainAppView', userController.create);

router.get('mainAppView', (req, res) => {
    if (req.query) {
        res.render('layouts/mainAppView', {
            error: true,
        })
        return;
    }
    res.render('layouts/mainAppView')
});


router.get("/", postController.index);

router.get("/mainAppView", (_req, res) => {
    res.render("layouts/mainAppView");
});

router.post("/mainAppView", postController.create);

router.get("/:id", postController.post);

router.post("/mainAppView/:id", postController.update);

module.exports = routing