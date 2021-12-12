"use strict";

const Spatioport = require('../models/spatioport');
const dotenv = require('dotenv');

dotenv.config();
const BASE_URL = process.env.URL +':'+process.env.PORT;

exports.getSpatioports = (req, res, next) => {
  
  Spatioport.find()
  .then(spatioports => {
    let withLinks = spatioports.map(spatioport => {
      let links = [
        {
          self: {
            method: "GET",
            href: BASE_URL + "/spatioport/" + spatioport._id.toString()
          }
        },
        {
          delete: {
            method: "DELETE",
            href: BASE_URL + "/spatioport/" + spatioport._id.toString()
          }
        }
      ];
      spatioport=spatioport.toJSON();
      spatioport.links=links;
      return spatioport;
    });
    res.json({
      spatioports: withLinks
    });
  })
  .catch(err => {
    next(err);
  });
};

exports.getSpatioport = (req, res, next) => {
  const SpatioportId = req.params.spatioportId;


  Spatioport.findById(SpatioportId)
  .then(spatioport => {
    if (!spatioport) {
      const error = new Error('Le spatioport n\'existe pas.');
      error.statusCode = 404;
      throw error;
    }
    let links = [
      {
        self: {
          method: "GET",
          href: BASE_URL + "/spatioport/" + spatioport._id.toString()
        }
      },
      {
        delete: {
          method: "DELETE",
          href: BASE_URL + "/spatioport/" + spatioport._id.toString()
        }
      }
    ];
    res.json({
      spatioport: spatioport,
      links: links
    });
  })
  .catch(err => {
    next(err);
  });
};

exports.createSpatioport = (req, res, next) => {
  const {city, position} = req.body;

  if (req.user.level !== 2) {
    const error = new Error("Vous ne pouvez pas...");
    error.statusCode = 401;
    throw error;
  }

  const spatioport = new Spatioport({
    city: city,
    position: position
  });

  spatioport.save()
    .then(() => {
      res.status(200).json({ message: "Spatioport créé", spatioport: spatioport });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteSpatioport = (req, res, next) => {
  console.log(req.user);
  if (req.user.level !== 2) {
    const error = new Error("Vous ne pouvez pas supprimer");
    error.statusCode = 401;
    throw error;
  }
  const spatioportId = req.params.spatioportId;
  Spatioport.findByIdAndRemove(spatioportId)
  .then(() => {
    console.log('Spatioport supprimé');
    res.status(200).json({ message: "Spatioport supprimé" });
  });
  
};


