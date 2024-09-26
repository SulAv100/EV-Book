const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller.js");

router
  .route("/setTravel")
  .post(adminController.dateFixer)
  .get(adminController.getTravel).delete(adminController.deleteTravel);
router.route("/bookSeat").post(adminController.seatBooker).get(adminController.bookData);

module.exports = router;
