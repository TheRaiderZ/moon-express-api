const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spatioportSchema = new Schema(
  {
    city: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model('Spatioport', spatioportSchema);
