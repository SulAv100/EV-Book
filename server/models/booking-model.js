const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  seatType: {
    type: String,
    required: true,
  },
  seatData: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
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
  phoneNumber: {
    type: String,
    required: true,
  }
});

const bookModel = mongoose.model("Book", bookingSchema);
module.exports = bookModel;
