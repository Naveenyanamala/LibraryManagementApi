import jwt from 'jsonwebtoken';
import User from "../models/User.model.js";
 const protectRoute = async (req,res,next) => {
    try {
      
        const token = req.cookies.jwt;
        
        if(!token){
            res.status(401).json({error:`unauthorized - No tokens provided`});

        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({error:`unauthorized - No tokens provided`});
        }
        console.log("hi");
        const user= await User.findOne({ email: decoded.email }).select("-password");
        
        if(!user){
            return res.status(401).json({error:`user not found`});
        }

        req.user=user;
        next();
    } catch (error) {
        console.log(`Error in protected middleware`);
        res.status(500).json({error:`Internal server error`});
    }
}

export default protectRoute;