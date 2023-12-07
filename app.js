const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoDBUrl = process.env.MONGODB_URL || "mongodb+srv://goyalswara:MpvSujBdaNub7OlF@cluster0.mii0ba0.mongodb.net/register?retryWrites=true&w=majority";
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const studentSchema = new mongoose.Schema({
  full_name: String,
  roll_number: String,
  email: String,
  birthdate: Date,
  address: String,
  skills: [String],
  interests: [String],
  family_income: Number,
  course_choice: String,
  post_college_plans: String,
});

const Student = mongoose.model("Student", studentSchema);

app.post("/sign_up", async function (req, res) {
  try {
    const {
      full_name,
      roll_number,
      email,
      birthdate,
      address,
      skills,
      interests,
      family_income,
      course_choice,
      post_college_plans,
    } = req.body;

    const data = {
      full_name,
      roll_number,
      email,
      birthdate,
      address,
      skills,
      interests,
      family_income,
      course_choice,
      post_college_plans,
    };

    const student = new Student(data);
    await student.save(); // Use await to wait for the promise to resolve

    console.log("Record inserted Successfully");
    return res.json({ message: "Record inserted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
