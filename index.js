const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
// dotenv.config({ path: './config.env' });
// const app = require('./app');
connectDb();
const app = express();

// app.use((req, res, next) => {
//     console.log('Hello form the middleware');
//     next();
//   });

app.use(cors());
app.use(express.json());
app.use("/vehicle", require("./routes/vehicleRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/laptop", require("./routes/laptopRoutes"));
app.use("/images", require("./routes/imageUpload"));
app.use(
  "/getImages",
  express.static(path.join(__dirname, "./assets/product_imgs"))
);
app.use(require("./routes/medicalRoutes"));
app.use(errorHandler);

app.get("/testing", (req, res) => {
  res.send("Hello, Testing Successful");
});

// app.get('/api/')

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
//   );

// const DB = "mongodb+srv://ajay12345@cluster0.yk7wj8a.mongodb.net/portfolio"

// mongoose
//     .connect(process.env.DATABASE)
//     .then(() => console.log('DB Connection is Successful'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server listening on port", port);
});
