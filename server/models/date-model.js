const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  departTime: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  droppingTime: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const dateModel = mongoose.model("Date", dateSchema);
module.exports = dateModel;
