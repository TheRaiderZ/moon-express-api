"use strict";

const Rocket = require('../models/rocket');
const dotenv = require('dotenv');

dotenv.config();
const BASE_URL = process.env.URL +':'+process.env.PORT;

exports.getRockets = (req, res, next) => {
      Rocket.find().populate('spatioportDepartureId').populate('spatioportArrivalId')
      .then(rockets => {
        
        let withLinks = rockets.map(rocket => {
          let links = [
            {
              self: {
                method: "GET",
                href: BASE_URL + "/rocket/" + rocket._id.toString()
              }
            },
            {
              delete: {
                method: "DELETE",
                href: BASE_URL + "/rocket/" + rocket._id.toString()
              }
            }
          ];
          rocket=rocket.toJSON();
          rocket.links=links;
          return rocket;
        });

        res.json({
            rockets: withLinks
        });
      })
      .catch(err => {
        next(err);
      });
};

exports.getRocket = (req, res, next) => {
      let rocketId = req.params.rocketId;
      Rocket.findById(rocketId).populate('spatioportDepartureId').populate('spatioportArrivalId')
      .then(rocket => {
        res.json({
            rocket: rocket
        });
      })
      .catch(err => {
        next(err);
      });
};

exports.createRocket = (req, res, next) => {
    const {date, nbPlace, nbPlaceRemaining, price, image, name, spatioportDepartureId, spatioportArrivalId} = req.body;

    if (req.user.level !== 2) {
      const error = new Error("Vous ne pouvez pas...");
      error.statusCode = 401;
      throw error;
    }
  
    const rocket = new Rocket({
        date: date,
        nbPlace: nbPlace,
        nbPlaceRemaining: nbPlaceRemaining,
        price: price,
        image: image,
        name: name,
        spatioportDepartureId: spatioportDepartureId,
        spatioportArrivalId: spatioportArrivalId,

    });
  
    rocket.save()
      .then(() => {
        res.status(200).json({ message: "Rocket créée", rocket: rocket });
      })
      .catch(err => {
        next(err);
      });
};

exports.deleteRocket = (req, res, next) => {
    if (req.user.level !== 2) {
        const error = new Error("Vous ne pouvez pas supprimer");
        error.statusCode = 401;
        throw error;
      }
      const rocketId = req.params.rocketId;
      Rocket.findByIdAndRemove(rocketId)
      .then(() => {
        console.log('Rocket supprimée');
        res.status(200).json({ message: "Rocket supprimée" });
      });
};


