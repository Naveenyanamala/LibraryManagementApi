import generateTokenAndSetCookies from '../utils/generateToken.js';
import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';

export const signup =async (req,res) => {
    try {
;
        const {name,email,password,confirmPassword,role} =req.body;
        if(password !== confirmPassword){
            res.status(400).json({error:`password doesn't match`});
        }
        const userFind= await User.findOne({email});
        if(userFind){
            res.status(400).json({error:`email already exists`});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role
        });

        if(newUser){
            generateTokenAndSetCookies(newUser.email, res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email
            });
        }else{
            res.status(400).json({error:`Invalid user data`});
        }
    } catch (error) {
        console.log(`error in signup`);
        res.status(400).json({error:`Internal server errors`})
    }
};


export const login  = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        const isvalidPassword= await bcrypt.compare(password,user?.password || "");
        if(!user || !isvalidPassword){
            return res.status(400).json({error:`Invalid credentials`});
        }
        
        generateTokenAndSetCookies(user.email,res);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        });
    } catch (error) {
        console.log(`error in login`);
        res.status(500).json({error:`Internal server error`});
    }
};

export const logout = (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:`Logout successfully`});
    } catch (error) {
        console.log("Error in logout");
        res.status(500).json({error:`Internal server error`});
    }
};