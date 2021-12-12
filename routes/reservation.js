"use strict";

const express = require('express');

const router = express.Router();

const reservationsController = require('../controllers/reservationsController');
const isAuth = require('../middleware/is-auth');

// /reservation/ => GET
router.get('/reservation/', reservationsController.getReservations);

// /reservation/reservationId => GET
router.get('/reservation/:reservationId', reservationsController.getReservation);

// /reservation/ => POST
router.post('/reservation/:rocketId/:nbPerson/:price', isAuth, reservationsController.createReservation);

// /reservation/:reservationId => DELETE
router.delete('/reservation/:reservationId', isAuth, reservationsController.deleteReservation);

module.exports = router;

