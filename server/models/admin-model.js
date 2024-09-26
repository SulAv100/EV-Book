const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const adminSchema = new mongoose.Schema({
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

adminSchema.methods.generateAdminToken = function(){
    return jwt.sign({
        userId:this._id.toString(),
        phoneNumber:this.phoneNumber
    }, process.env.JWT_SECRET_KEY,
    {
        expiresIn:'2d'
    }

);
   
};



const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;