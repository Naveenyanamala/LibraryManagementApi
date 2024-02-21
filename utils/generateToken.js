import jwt from 'jsonwebtoken';


const generateTokenAndSetCookies = (email,res) => {
    const token = jwt.sign ({email},process.env.JWT_SECRET,{
        expiresIn:'15d'
    });
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    });
};


export default generateTokenAndSetCookies; 