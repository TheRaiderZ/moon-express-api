const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rocketSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    nbPlace: {
      type: Number,
      required: true
    },
    nbPlaceRemaining : {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    spatioportDepartureId: {
      type: Schema.Types.ObjectId,
      ref: 'Spatioport'
    },
    spatioportArrivalId: {
      type: Schema.Types.ObjectId,
      ref: 'Spatioport'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rocket', rocketSchema);
