const mongoose = require('mongoose');

const MONGODB_URI="YOUR MONGO CONNECTION STRING"

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));


// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
    name : String,
    email : String,
    password : String
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
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