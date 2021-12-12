"use strict";

const express = require('express');

const router = express.Router();

const rocketsController = require('../controllers/rocketsController');
const isAuth = require('../middleware/is-auth');

// /rocket/ => GET
router.get('/rocket/', rocketsController.getRockets);

// /rocket/rocketId => GET
router.get('/rocket/:rocketId', rocketsController.getRocket);

// /rocket/ => POST
router.post('/rocket/', isAuth, rocketsController.createRocket);

// /rocket/:rocket => DELETE
router.delete('/rocket/:rocketId', isAuth, rocketsController.deleteRocket);

module.exports = router;

