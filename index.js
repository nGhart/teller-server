const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
// app.use(
//   cors({
//     origin: [
//       "*",
//       //"https://teller-zeta.vercel.app/"
//     ],
//     credentials: true,
//   })
// );
//app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (you can specify specific origins instead of '*')
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH, DELETE, OPTIONS"
  ); // Allow the specified HTTP methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Allow the specified headers
  next();
});

const MONGO_URL =
  "mongodb+srv://ondg:ondg@cluster0.8rlvalv.mongodb.net/bankteller?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((d) => {
    console.log("connected to DB");
  });

//connectToDB();

app.use(express.json());

const accountRoutes = require("./router/accountRoute");
const tellerRoutes = require("./router/tellerRoute");
const transactionRoute = require("./router/transactionRoute");

//ROUTES FOR ACCOUNT OWNER [CREATE,DEPOSIT,WITHDRAW]

//changes
app.use("/account", accountRoutes);

// ROUTE FOR TELLER [ADD TELLER]
app.use("/teller", tellerRoutes);
// ROUTE TO INPUT TRANSACTION
app.use("/transaction", transactionRoute);

app.listen(1997, () => {
  console.log("Server is listening");
});
