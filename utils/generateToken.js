import jwt from 'jsonwebtoken';
import UserToken from "../models/userToken.model.js";

const generateTokenAndSetCookies = async(email) => {
    try {
        const accessToken = jwt.sign ({email},process.env.ACCESS_TOKEN_PRIVATE_KEY,{
            expiresIn:'15m'
        });
    
        const refreshToken = jwt.sign ({email},process.env.REFRESH_TOKEN_PRIVATE_KEY,{
            expiresIn:'30d'
        });
    
        const userToken = await UserToken.findOne({email});
        if(userToken) await userToken.deleteOne();

        await new UserToken({email, token:refreshToken}).save();

        return Promise.resolve({accessToken,refreshToken});
    
    
    } catch (error) {
        return Promise.reject(error);
    }
};


export default generateTokenAndSetCookies; 