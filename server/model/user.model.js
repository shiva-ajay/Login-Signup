import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
    phoneNumber: {
        type: String,
        required: true, 
    },
    rollNumber: {
        type: String,
        required: true, 
        unique: true,
    },
    collegeName: {
        type: String,
        required: true, 
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"], 
    },
    branch: {
        type: String,
        required: true,
        enum: ["CSM", "CSD", "CSE", "ECE", "Other"], 
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
