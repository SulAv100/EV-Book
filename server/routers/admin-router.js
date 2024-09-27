const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller.js");

router
  .route("/setTravel")
  .post(adminController.dateFixer)
  .get(adminController.getTravel)
  .delete(adminController.deleteTravel);
router
  .route("/bookSeat")
  .post(adminController.seatBooker)
  .get(adminController.bookData);
router
  .route("/confirmBook")
  .post(adminController.confirmBook)
  .get(adminController.getConfirmSeat);

  router.route("/deleteBook").post(adminController.deleteBook);
  router.route("/getDashData").get(adminController.getAllData);

  router.route('/getBookData').post(adminController.sendBookData);

module.exports = router;
