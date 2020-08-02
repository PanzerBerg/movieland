const express = require('express')

const ColorsController = require('./controllers/ColorsController')

const routes = express.Router();
const colorsController = new ColorsController();

routes.post('/colors', colorsController.paletteColor);

module.exports = routes;