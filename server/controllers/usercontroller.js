const userModel = require("../models/user-model.js");
const bcrypt = require("bcryptjs");
const adminModel = require("../models/admin-model.js");

const register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;

    const existNumber = await userModel.findOne({ phoneNumber });

    if (existNumber) {
      return res
        .status(200)
        .json({ msg: "Another account with phone number already exists" });
    }

    const userCreate = await userModel.create({
      firstName,
      lastName,
      phoneNumber,
      password,
    });

    const token = await userCreate.generateToken();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_DEV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
      .json({ msg: "Account has been created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const verifyNumber = await userModel.findOne({ phoneNumber });
    if (!verifyNumber) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      verifyNumber.password
    );

    if (passwordCompare) {
      const token = await verifyNumber.generateToken();
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
          sameSite: "strict",
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        .json({ msg: "Logged In Successfully" });
    } else {
      return res.status(402).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV == "production",
        expires: new Date(0),
      })
      .json({ msg: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ msg: "Server error occured" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const verifyNumber = await adminModel.findOne({ phoneNumber });

    if (!verifyNumber) {
      return res.status(402).json({ msg: "Invalid data" });
    }

    const comparePassword = await bcrypt.compare(
      password,
      verifyNumber.password
    );

    if (comparePassword) {
      const adminToken = await verifyNumber.generateAdminToken();
      res
        .cookie("adminToken", adminToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV == "production",
          expires: new Date(Date.now() + 30 * 40 * 60 * 60 * 1000),
        })
        .json({ msg: "Successfully Logged in" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { register, login, getProfile, logout, adminLogin };
