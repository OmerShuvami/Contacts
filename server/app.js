const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);

module.exports = app;
