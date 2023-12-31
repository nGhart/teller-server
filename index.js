const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

// app.use(
//   cors({
//     origin: ["*", "https://teller-zeta.vercel.app/"],
// methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(cors());
app.use((req, res, next) => {
  //specify origins
  res.header("Access-Control-Allow-Origin", "*");
  //specify methods
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH, DELETE, OPTIONS"
  );
  //specify headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//change
// const MONGO_URL =
//   "mongodb+srv://ondg:ondg@cluster0.8rlvalv.mongodb.net/bankteller?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");
  });

//connectToDB();

app.use(cookieParser());

app.use(express.json());

const accountRoutes = require("./router/accountRoute");
const tellerRoutes = require("./router/tellerRoute");
const transactionRoute = require("./router/transactionRoute");

//ROUTES
app.use("/account", accountRoutes);
app.use("/teller", tellerRoutes);
app.use("/transaction", transactionRoute);

app.listen(1997, () => {
  console.log(`Server is listening on ${PORT}`);
});
