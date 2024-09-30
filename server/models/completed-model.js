const mongoose = require("mongoose");

const completedSchema = new mongoose.Schema({
    vehicleNo:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    startLocation:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    }
})

const completeModel = mongoose.model('Complete', completedSchema);
module.exports = completeModel;