const express = require('express')
const routing = express.Router()

const userController = require('../appControl/userCon')
const eventController = require('../appControl/eventCon')


routing.post('/mainAppView/users',userController.create)

routing.post('/mainAppView/posts',eventController.create)

routing.get('/mainAppView/posts/:id',eventController.post)

routing.put('/mainAppView/posts/:id',eventController.update)

routing.delete('/mainAppView/posts/:id',eventController.delete)

routing.get('mainAppView', (req, res) => {
    if (req.query) {
        res.render('layouts/mainAppView', {
            error: true,
        })
        return;
    }
    res.render('layouts/mainAppView')
});

routing.get("/", eventController.index);

module.exports = routing