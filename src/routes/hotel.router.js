const { getAll, create, getOne, remove, update } = require('../controllers/hotel.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerHotel = express.Router();

routerHotel.route('/hotels')
    .get(getAll)
    .post(verifyJWT, create);

routerHotel.route('/hotels/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = routerHotel;