require("dotenv").config(); //Always require dotenv on top of server file
const express = require("express");
const connectDb = require("./utils/db")
const cors = require("cors");
const  cookieParser = require("cookie-parser")
const authRoute = require("./routers/auth-router");
const adminRoute = require("./routers/admin-router")

const app = express(); //This lines gives the control of express to app variable

const corsOptions = {
  origin: ["http://localhost:5173"], // this will allow this  url to send data to backend
  credentials: true, //this allows the cookies to be sent or recieve
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // this allows these methods to be implemented
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); //this will use the above defined methods
app.options("*", cors(corsOptions));


app.use(express.json());//allows data requirest and response in json format
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/admin",adminRoute);

connectDb().then(() => {
  const PORT = process.env.POST || 3000;
  app.listen(PORT, () => {
    console.log("Server is ready");
  });
});
