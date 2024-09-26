const dateModel = require("../models/date-model.js");
const bookModel = require("../models/booking-model.js");

const dateFixer = async (req, res) => {
  try {
    console.log(req.body);

    const {
      vehicleNo,
      startLocation,
      departTime,
      destination,
      droppingTime,
      date,
      duration,
      availableSeats,
      price,
    } = req.body;

    const travelCreate = await dateModel.create({
      vehicleNo,
      startLocation,
      departTime,
      destination,
      droppingTime,
      date,
      duration,
      availableSeats,
      price,
    });
    return res.status(201).json({ msg: "Successfully created queue" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error has occured" });
  }
};

const getTravel = async (req, res) => {
  try {
    const collectData = await dateModel.find({});
    return res.status(200).json(collectData);
  } catch (error) {
    console.error(error);
  }
};

const seatBooker = async (req, res) => {
  try {
    const {
      seatType,
      seatData,
      price,
      vehicleNo,
      startLocation,
      departTime,
      destination,
      droppingTime,
      date,
      phoneNumber,
    } = req.body;
    console.log(req.body);

    const newEntry = await bookModel.create({
      seatType,
      seatData,
      price,
      vehicleNo,
      startLocation,
      departTime,
      destination,
      droppingTime,
      date,
      phoneNumber,
    });

    return res.status(202).json({ msg: "Successfully booked" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mssg: "Network error occured" });
  }
};

const deleteTravel = async (req, res) => {
  try {
    const { travelId } = req.body;
    console.log(travelId);
    if (!travelId) {
      return res.status(404).json({ msg: "Invalid Operation" });
    }
    const travelData = await dateModel.findByIdAndDelete(travelId);

    if (!travelData) {
      return res.status(404).json({ msg: "Didnt found any travel data" });
    }

    return res.status(200).json({ msg: "Successfully done" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error occured" });
  }
};

const bookData = async (req, res) => {
  try {
    const bookData = await bookModel.find();
    if (!bookData) {
      return res.status(402).json({ msg: "No booking done till now" });
    }
    return res.status(202).json(bookData);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { dateFixer, getTravel, seatBooker, deleteTravel,bookData };
