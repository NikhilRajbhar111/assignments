const {mongoose } = require("mongoose");
require("dotenv").config();
const MONGODB_URI=process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));



const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const TodoSchema = new mongoose.Schema({
    userId : String,
    todo : String,
    done : Boolean
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}