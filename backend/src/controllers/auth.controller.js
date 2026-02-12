import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup =  async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        // check if email valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Please enter a valid email address"});
        }

        // if user already exists
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message: "User already exists with this email"});
        }
        // 123456 => hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            //generateToken(newUser._id, res);
            //await newUser.save();
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

        // todo - send a welcome email to the user

        } else {
            res.status(500).json({message: "Invalid user data"});
        }

    } catch(error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({message: "Server Error: " + error.message});
    }
}