const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admincontroller.js");

router
  .route("/setTravel")
  .post(adminController.dateFixer)
  .get(adminController.getAllTravel)
  ;

  router.route('/getTravelData').post(adminController.getTravel);
  

router.route("/removeTravel").post(adminController.deleteTravel).get(adminController.getCompleteTravel);
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
router.route("/getUserSeat").post(adminController.getUserSeat);

router.route("/getBookData").post(adminController.sendBookData);

router.route("/checkExpire").post(adminController.checkExpireRide);

router.route('/getTicket').post(adminController.getTicket)
router.route('/getBusData').post(adminController.getBusDetails)
router.route("/adminBookSeat").post(adminController.bookSeatForPeople);

module.exports = router;
