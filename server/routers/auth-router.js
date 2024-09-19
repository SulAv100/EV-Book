const express = require("express");
const router = express.Router();

router.route('/').post(()=>{
    console.log("Welcome to my server")
})

module.exports = router;