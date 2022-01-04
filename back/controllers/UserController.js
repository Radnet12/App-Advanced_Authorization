// Modules
const { validationResult } = require("express-validator");

// Exceptions
const ApiError = require("../exceptions/ApiError");

// Services
const UserService = require("../services/UserService");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                next(
                    ApiError.BadRequest("Ошибка при валидации!", errors.array())
                );
            }

            // Getting data from request
            const { email, password } = req.body;

            const userData = await UserService.registration(email, password);

            // Save token to cookies
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            // Getting data from request
            const { email, password } = req.body;

            const userData = await UserService.login(email, password);

            // Save token to cookies
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            // Get token from cookies
            const { refreshToken } = req.cookies;

            // Avoking logout service
            const token = await UserService.logout(refreshToken);

            // Deleting token from cookies
            res.clearCookie("refreshToken");

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activation(req, res, next) {
        try {
            // Getting params
            const activationLink = req.params?.link;

            await UserService.activate(activationLink);

            // redirecting to the main site
            return res.redirect(process.env.APP_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            // Get token from cookies
            const { refreshToken } = req.cookies;

            // Avoking logout service
            const userData = await UserService.refresh(refreshToken);

            // Save token to cookies
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
