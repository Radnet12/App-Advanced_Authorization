// Modules
const jwt = require("jsonwebtoken");

// Models
const TokenModel = require("../models/TokenModel");

class TokenService {
    generateTokens(payload) {
        // Generating accessToken
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "30m" }
        );

        // Generating refreshToken
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY,
            { expiresIn: "30d" }
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    // Save token to DB
    async saveToken(userId, refreshToken) {
        // Check if userId has already been saved to DB
        const tokenData = await TokenModel.findOne({ user: userId });

        // if exist rewrite token for this user
        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            // save new token to DB
            return tokenData.save();
        }

        // if user does not exiest, creating new one
        const token = await TokenModel.create({ user: userId, refreshToken });

        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });

        return tokenData;
    }

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET_KEY
            );
            return userData;
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET_KEY
            );
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findRefreshToken(refreshToken) {
        // Finding token in DB
        const tokenData = await TokenModel.findOne({ refreshToken });

        return tokenData;
    }
}

module.exports = new TokenService();
