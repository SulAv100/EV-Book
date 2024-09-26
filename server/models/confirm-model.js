const mongoose = require("mongoose");

const confirmSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
  },
  seatData: {
    type: Array,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const confirmModel = mongoose.model("Confirm", confirmSchema);
module.exports = confirmModel;
