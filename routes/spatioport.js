"use strict";

const express = require('express');

const router = express.Router();

const spatioportsController = require('../controllers/spatioportsController');
const isAuth = require('../middleware/is-auth');

// /spatioport/ => GET
router.get('/spatioport/', spatioportsController.getSpatioports);

// /spatioport/spatioportId => GET
router.get('/spatioport/:spatioportId', spatioportsController.getSpatioport);

// /spatioport/ => POST
router.post('/spatioport/', isAuth, spatioportsController.createSpatioport);

// /spatioport/:spatioportId => DELETE
router.delete('/spatioport/:spatioportId', isAuth, spatioportsController.deleteSpatioport);

module.exports = router;

