// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const MONGO_URL =
//   "mongodb+srv://ondg:ondg@cluster0.8rlvalv.mongodb.net/bankteller?retryWrites=true&w=majority";

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((d) => {
//     console.log("connected to DB");
//   });

// const accountRoutes = require("./router/accountRoute");
// const tellerRoutes = require("./router/tellerRoute");
// const transactionRoute = require("./router/transactionRoute");

// //ROUTES FOR ACCOUNT OWNER [CREATE,DEPOSIT,WITHDRAW]

// //changes
// //app.use("/owner", accountRoutes);
// app.use("/account", accountRoutes);

// // ROUTE FOR TELLER [ADD TELLER]
// app.use("/teller", tellerRoutes);
// // ROUTE TO INPUT TRANSACTION
// app.use("/transaction", transactionRoute);

// app.listen(4000, () => {
//   console.log("Running on port 4000");
// });

const express = require("express");
//const connectToDB = require("./db");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

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
//app.use("/owner", accountRoutes);
app.use("/account", accountRoutes);

// ROUTE FOR TELLER [ADD TELLER]
app.use("/teller", tellerRoutes);
// ROUTE TO INPUT TRANSACTION
app.use("/transaction", transactionRoute);

app.listen(1997, () => {
  console.log("Server is listening");
});
