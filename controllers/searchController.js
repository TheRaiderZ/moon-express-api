"use strict";

const Rocket = require('../models/rocket');
const dotenv = require('dotenv');

dotenv.config();
const BASE_URL = process.env.URL +':'+process.env.PORT;

exports.createSearch = (req, res, next) => {
    let date = req.params.date;
    let nbPerson = req.params.nbPerson;
    let spatioportDepartureId = req.params.spatioportDepartureId;
    let spatioportArrivalId = req.params.spatioportArrivalId;
    const sameDay = (first, second) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
        
    Rocket.find({spatioportDepartureId:spatioportDepartureId, 
        spatioportArrivalId:spatioportArrivalId
    }).populate('spatioportDepartureId').populate('spatioportArrivalId').then(rocket => {
        // console.log('rocket :>> ', rocket);
        let filteredRockets = rocket.filter(x => (
            x.nbPlaceRemaining>=nbPerson&&sameDay(new Date(x.date),new Date(date))));

            let filteredRocketsWithLinks = filteredRockets.map(rocket => {
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
            rockets: filteredRocketsWithLinks
        });
      })
      .catch(err => {
        next(err);
      });
};