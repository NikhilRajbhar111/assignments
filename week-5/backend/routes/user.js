const { Router } = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database');
const userMiddleware = require("../middleware/user");

const router = Router();

router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).send("User created");
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(404).send("User not found");
    
    const isValidPassword = await bcrypt.compare(password.toString(), user.password.toString());
    if (!isValidPassword) return res.status(401).send("Invalid credentials");
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ auth: true, token });
});

router.post('/logout', userMiddleware, (req, res) => {
    // Invalidate token on client-side (not implemented here)
    res.json({ auth: false, token: null });
});

module.exports = router;
