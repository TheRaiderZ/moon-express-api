"use strict";

const Reservation = require('../models/reservation');
const dotenv = require('dotenv');

dotenv.config();
const BASE_URL = process.env.URL +':'+process.env.PORT;

exports.getReservations = (req, res, next) => {
    Reservation.find()
    .then(reservations => {
      let withLinks = reservations.map(reservation => {
        let links = [
          {
            self: {
              method: "GET",
              href: BASE_URL + "/reservation/" + reservation._id.toString()
            }
          },
          {
            delete: {
              method: "DELETE",
              href: BASE_URL + "/reservation/" + reservation._id.toString()
            }
          }
        ];
        reservation=reservation.toJSON();
        reservation.links=links;
        return reservation;
      });

      res.json({
        reservations: withLinks
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getReservation = (req, res, next) => {
    let reservationId = req.params.reservationId;
    Reservation.findById(reservationId)
      .then(reservation => {

        let links = [
          {
            self: {
              method: "GET",
              href: BASE_URL + "/reservation/" + reservation._id.toString()
            }
          },
          {
            delete: {
              method: "DELETE",
              href: BASE_URL + "/reservation/" + reservation._id.toString()
            }
          }
        ];

        res.json({
            reservation: reservation,
            links: links,
        });
      })
      .catch(err => {
        next(err);
      });
};

exports.createReservation = (req, res, next) => {
  console.log('req.params :>> ', req.params);
    const {nbPerson, price, rocketId} = req.params;
    // console.log('rocketId :>> ', rocketId);
    if (req.user.level !== 1 && req.user.level !== 2 ) {
      const error = new Error("Vous ne pouvez pas...");
      error.statusCode = 401;
      throw error;  
    }
  
    const reservation = new Reservation({
        userId: req.user.id,
        nbPerson: nbPerson,
        price: price,
        rocketId: rocketId,
    });
  
    reservation.save()
      .then(() => {
        res.status(200).json({ message: "Reservation créée", reservation: reservation });
      })
      .catch(err => {
        next(err);
      });
};  

exports.deleteReservation = (req, res, next) => {
    if (req.user.level !== 2) {
        const error = new Error("Vous ne pouvez pas supprimer");
        error.statusCode = 401;
        throw error;
      }
      const reservationId = req.params.reservationId;
      Reservation.findByIdAndRemove(reservationId)
      .then(() => {
        console.log('Reservation supprimée');
        res.status(200).json({ message: "Reservation supprimée" });
      });
};


