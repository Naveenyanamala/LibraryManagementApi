import UserToken from "../models/userToken.model.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
        
        const doc = UserToken.findOne({ token: refreshToken });
        if (!doc)
            return reject({ error: true, message: "Invalid refresh token" });

        const tokenDetails = jwt.verify(refreshToken, privateKey)
        if (!tokenDetails)
            return reject({ error: true, message: "Invalid refresh token" });
        resolve({
            tokenDetails,
            error: false,
            message: "Valid refresh token",
        });
        
        
    });
};

export default verifyRefreshToken;