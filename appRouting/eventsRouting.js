const express = require('express')
const routing = express.Router()

const eventController = require('../appControl/eventCon')

routing.get("/", eventController.index);

routing.post("/create", eventController.create);

routing.delete("/:id", eventController.delete);

module.exports = routing