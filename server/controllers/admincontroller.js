const dateModel = require("../models/date-model.js");
const bookModel = require("../models/booking-model.js");
const confirmModel = require("../models/confirm-model.js");
const userModel = require("../models/user-model.js");
const completeModel = require("../models/completed-model.js");

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
    // console.log(req.body);
    const { startLocation, destination, date } = req.body;

    const collectData = await dateModel.find({
      startLocation: startLocation,
      destination: destination,
      date: date,
    });

    if (!collectData) {
      console.log("No data found");
      return res.status(404).json({ msg: "No tarvel data found for this" });
    }

    console.log("Yo hai", collectData);
    return res.status(200).json(collectData);
  } catch (error) {
    console.error(error);
  }
};

const getAllTravel = async (req, res) => {
  try {
    const collectData = await dateModel.find();
    console.log("Data is ", collectData);

    if (!collectData) {
      console.log("No data found");
      return res.status(404).json({ msg: "No tarvel data found for this" });
    }

    console.log(collectData);
    return res.status(200).json(collectData);
  } catch (error) {
    console.error(error);
  }
};

const seatBooker = async (req, res) => {
  console.log(req.body);
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
      availableSeats,
      bookingId, // Extract bookingId properly
    } = req.body;

    console.log(req.body);

    // Check if bookingId is valid
    if (bookingId && bookingId !== "N/A") {
      // Proceed with updating the existing booking
      const updatedEntry = await bookModel.findByIdAndUpdate(
        bookingId, // This should now be a valid string
        {
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
          availableSeats,
        },
        { new: true }
      );

      if (updatedEntry) {
        return res.status(200).json({ msg: "Successfully updated booking" });
      } else {
        return res.status(404).json({ msg: "Booking not found" });
      }
    } else if (bookingId === "N/A") {
      // Handle the N/A case
      console.log("Booking ID is N/A, creating a new booking...");
      // Create a new booking if bookingId is N/A
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
        availableSeats,
      });

      return res
        .status(201)
        .json({ msg: "Successfully booked", bookingId: newEntry._id });
    } else {
      // If bookingId is not provided at all
      console.log("Booking ID is not provided.");
      return res.status(400).json({ msg: "Booking ID is required." });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "Network error occurred" });
  }
};

const deleteTravel = async (req, res) => {
  try {
    const { travelId } = req.body;

    // Validate travelId existence
    if (!travelId) {
      return res
        .status(400)
        .json({ msg: "Invalid Operation: travelId is required" });
    }

    // Fetch the travel data
    const travelFetch = await dateModel.findById(travelId);

    // Check if travel data exists
    if (!travelFetch) {
      return res.status(404).json({ msg: "Data no longer available" });
    }

    // Log the fetched travel data
    console.log("Travel Data:", travelFetch);

    const { vehicleNo, date, startLocation, destination } = travelFetch;

    // Create new data in the completeModel
    const newData = await completeModel.create({
      vehicleNo,
      date,
      startLocation,
      destination,
    });

    // Log the newly created data for debugging (optional)
    console.log("New Data created:", newData);

    // Delete the travel data from dateModel
    const travelData = await dateModel.findByIdAndDelete(travelId);

    // Check if travel data was deleted
    if (!travelData) {
      return res.status(404).json({ msg: "No travel data found to delete" });
    }

    // Return success response
    return res
      .status(200)
      .json({ msg: "Successfully deleted travel and created new entry" });
  } catch (error) {
    console.error("Error in deleteTravel:", error); // Log error for debugging
    return res.status(500).json({ msg: "Internal Server Error occurred" });
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

const confirmBook = async (req, res) => {
  try {
    const { bookingData } = req.body;
    const {
      _id: bookingId,
      seatData,
      vehicleNo,
      startLocation,
      destination,
      date,
      phoneNumber,
    } = bookingData;

    const newModelData = new confirmModel({
      bookingId,
      vehicleNo,
      seatData,
      phoneNumber,
      startLocation,
      destination,
      date,
    });

    await newModelData.save();

    const deleteModelData = await bookModel.findByIdAndDelete(bookingId);
    if (!deleteModelData) {
      console.log(bookingData.bookingId);
      return res.status(404).json({ msg: "No such reservation made" });
    }
    console.log("Donw");

    return res.status(200).json({ msg: "Successfully saved record" });
  } catch (error) {
    console.error(error);
  }
};

const getConfirmSeat = async (req, res) => {
  try {
    const allData = await confirmModel.find();
    console.log(allData);
    if (!allData.length > 0) {
      return res.status(204).json({ msg: "No bookings till now" });
    }
    return res.status(200).json({ allData });
  } catch (error) {
    console.error(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const removeData = await bookModel.findByIdAndDelete(bookingId);
    if (!removeData) {
      return res.status(404).json({ msg: "No data found to remove" });
    }
    return res.status(200).json("Successfully removed");
  } catch (error) {
    console.error(error);
  }
};

const getAllData = async (req, res) => {
  try {
    const bookedData = await confirmModel.find();
    const bookLength = bookedData.length;

    const totalUsers = await userModel.find();
    const userNumber = totalUsers.length;

    const vehicleData = await dateModel.find().select("vehicleNo");
    const uniqueVehicleNos = [
      ...new Set(vehicleData.map((item) => item.vehicleNo)),
    ];

    const recentBookings = await bookModel.find();

    if (!bookedData || !totalUsers || !vehicleData) {
      return res.status(404).json({ msg: "Didnt found any relevant data" });
    }
    return res.status(202).json({
      totalBooks: bookLength,
      totalUsers: userNumber,
      totalVehicle: uniqueVehicleNos,
      totalBookings: recentBookings,
    });
  } catch (error) {
    console.error(error);
  }
};

const sendBookData = async (req, res) => {
  try {
    console.log(req.body);
    const { date, vehicleNo, userContact } = req.body;

    let userBooked = await bookModel.find({
      phoneNumber: userContact,
      date,
      vehicleNo,
    });
    if (!userBooked || userBooked.length === 0) {
      userBooked = null;
    }
    console.log("User le haneko book", userBooked);

    let findBooked = await bookModel.find({
      date,
      vehicleNo,
      phoneNumber: { $ne: userContact },
    });

    if (!findBooked || findBooked.length === 0) {
      findBooked = null;
    }

    console.log("User le nahaneko book", findBooked);
    let findConfirmed = await confirmModel.find({ date, vehicleNo });

    if (!findConfirmed || findConfirmed.length === 0) {
      findConfirmed = null;
    }
    return res.status(200).json({ userBooked, findBooked, findConfirmed });
  } catch (error) {
    console.error(error);
  }
};

const getUserSeat = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);

    const confirmSeat = await confirmModel.find({ phoneNumber });
    console.log(confirmSeat);

    if (!confirmSeat) {
      console.log("No data found");
      return res.status(404).json({ msg: "No such data has been found" });
    }

    return res.status(200).json(confirmSeat);
  } catch (error) {
    console.error(error);
  }
};

const getCompleteTravel = async (req, res) => {
  try {
    const completeData = await completeModel.find();
    if (!completeData) {
      return res.status(404).json({ msg: "No travel data" });
    }
    return res.status(202).json(completeData);
  } catch (error) {
    console.error(error);
  }
};

const checkExpireRide = async (req, res) => {
  try {
    const { todayDate, currentTime } = req.body;
    console.log("Today's date:", todayDate, "Current time:", currentTime);

    const availableRides = await dateModel.find({ date: todayDate });
    console.log("Available rides for today:", availableRides);

    if (availableRides.length < 1) {
      console.log("No ride for today");
      return res.send("No rides available for today.");
    }

    for (const ride of availableRides) {
      const { _id, vehicleNo, startLocation, destination, date, departTime } =
        ride;

      const formattedDepartTime = departTime.replace(/([APM]{2})/, " $1");

      if (
        !formattedDepartTime ||
        isNaN(new Date(`${date} ${formattedDepartTime}`))
      ) {
        console.error(
          `Invalid departTime for ride ${vehicleNo}: ${formattedDepartTime}`
        );
        continue;
      }

      console.log("Uta ko time (currentTime):", currentTime);
      console.log("Xutne time (departTime):", formattedDepartTime);

      const currentDateTime = new Date(`${todayDate} ${currentTime}`);

      const rideDateTime = new Date(`${date} ${formattedDepartTime}`);

      if (currentDateTime > rideDateTime) {
        await completeModel.create({
          vehicleNo,
          date,
          startLocation,
          destination,
        });

        await dateModel.findByIdAndDelete(_id);

        console.log(
          `Ride ${vehicleNo} moved to completeModel and removed from dateModel.`
        );
      } else {
        console.log(`Ride ${vehicleNo} has not expired yet.`);
      }
    }

    res.send("Rides processed successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
};

module.exports = {
  dateFixer,
  getTravel,
  seatBooker,
  deleteTravel,
  bookData,
  confirmBook,
  getConfirmSeat,
  deleteBook,
  getAllData,
  sendBookData,
  getUserSeat,
  getCompleteTravel,
  getAllTravel,
  checkExpireRide,
};
