import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, rollNumber, collegeName, gender, branch } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Check if roll number is already registered
    const existingRollNumber = await User.findOne({ rollNumber });
    if (existingRollNumber) {
      return res.status(400).json({ error: "Roll number is already registered" });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      rollNumber,
      collegeName,
      gender,
      branch
    });

    // Save user and generate token
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        rollNumber: newUser.rollNumber,
        collegeName: newUser.collegeName,
        gender: newUser.gender,
        branch: newUser.branch,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token and respond with user details
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      rollNumber: user.rollNumber,
      collegeName: user.collegeName,
      gender: user.gender,
      branch: user.branch,
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
