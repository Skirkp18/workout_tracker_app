const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_db", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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

// Listen on port 3001
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});