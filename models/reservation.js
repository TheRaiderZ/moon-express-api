const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    nbPerson: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rocketId: {
      type: Schema.Types.ObjectId,
      ref: 'Rocket'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
