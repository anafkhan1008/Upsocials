const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const bodyParser = require("body-parser"); // Import body-parser
const cors = require("cors");
const AWS = require('aws-sdk');
const Port = process.env.PORT || 4000;
dotenv.config();


AWS.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  region: 'ap-south-1',
});

const s3 = new AWS.S3();

mongoose.connect(
  process.env.MONGO_URL
)
.then(()=>{
    console.log("Database is connected")
})


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
// app.use(morgan("common"));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(Port, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});