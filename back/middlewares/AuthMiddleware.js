// Exceptions
const ApiError = require("../exceptions/ApiError");

// Service
const TokenService = require("../services/TokenService");

module.exports = (req, res, next) => {
    try {
        // Getting auth headers
        const authorizationHeader = req.headers.authorization;

        // checking
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        // Getting access token
        const accessToken = authorizationHeader.split(" ")[1];
        // checking
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        // checking
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
