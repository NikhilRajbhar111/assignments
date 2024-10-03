const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

// Use user and todo routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Start server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
