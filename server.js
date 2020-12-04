const express = require("express");
const mongoose = require('mongoose');
const logger = require("morgan");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { 
  useNewUrlParser: true,
  useFindAndModify: false 
});



//                       PLACE ROUTES HERE!
// ===================================================================

app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));

app.get("/exercise", (res, req) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});


// ======================================================================

// Listen on port 3000
app.listen(3000, () => {
  console.log(`http://localhost:${3000}`);
});