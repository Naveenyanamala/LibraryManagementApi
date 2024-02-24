import jwt from 'jsonwebtoken';
import User from "../models/User.model.js";


export const authenticate = async (req,res,next) => {
    if( req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
    {
        try {
            
            const token = req.headers.authorization.split(" ")[1];
           
            
            if(!token){
                return res.status(401).json({error:`unauthorized - No tokens provided`});

            }
            
            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY);
            
            if(!decoded){
                return res.status(401).json({error: 'Unauthorized - Invalid token' });
            }
            
            const user= await User.findOne({ _id: decoded.userId }).select("-password");
            
            if(!user){
                return res.status(401).json({error: 'Unauthorized - User not found' });
            }

            req.user=user;
            next();
        } catch (error) {
            console.log(`Error in protected middleware`);
            return res.status(500).json({error:`Internal server error`});
        }
    }
};


export const admin = async(req,res,next) => {
    if (req.user && req.user.role === "admin") {
        next();
      } else {
        res.status(401);
        return res.status(400).json({message:`Not authorized as an admin`})
      }
};
