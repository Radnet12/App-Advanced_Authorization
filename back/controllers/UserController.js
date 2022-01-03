// Services
const UserService = require("../services/UserService");

class UserController {
    async registration(req, res, next) {
        try {
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
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
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
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(["123", "1234"]);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
