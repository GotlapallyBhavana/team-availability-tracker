const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/teamDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);
});

app.put("/users/:id", async (req, res) => {

    const user = await User.findById(req.params.id);

    user.available = !user.available;

    await user.save();

    res.json(user);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
