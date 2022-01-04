// Modules
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// Services
const MailService = require("./MailService");
const TokenService = require("./TokenService");

// Models
const UserModel = require("../models/UserModel");

// DTOs
const UserDto = require("../dtos/UserDto");

// Exceptions
const ApiError = require("../exceptions/ApiError");

class UserService {
    async registration(email, password) {
        // Checking if such email is already exist in DB
        const candidate = await UserModel.findOne({ email });

        // If exist throw error
        if (candidate) {
            throw ApiError.BadRequest(
                `Пользователь с почтовым адресом ${email} уже существует!`
            );
        }

        // Creating hash password
        const hashPassword = await bcrypt.hash(password, 6);

        // Generating activation link
        const activationLink = uuid.v4();

        // Creating new User
        const newUser = await UserModel.create({
            email,
            password: hashPassword,
            activationLink,
        });

        // Send email
        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/activate/${activationLink}`
        );

        // Returning from DTO all info about USER except password
        const userDto = new UserDto(newUser);
        const tokens = TokenService.generateTokens({ ...userDto });

        // Save token to DB
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async activate(activationLink) {
        // Checking if user has activation link
        const user = await UserModel.findOne({ activationLink });

        // if no throw error
        if (!user) {
            throw ApiError.BadRequest("Неккоректная ссылка для активации!");
        }

        // activating user
        user.isActivated = true;

        // save user
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest(
                `Пользователь с почтовым адресом ${email} не найден!`
            );
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordEqual) {
            throw ApiError.BadRequest("Неверный пароль!");
        }

        // Returning from DTO all info about USER except password
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });

        // Save token to DB
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken) {
        // Deleting token
        const token = await TokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        // Checking if token exist
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        // Validating refresh Token
        const userData = TokenService.validateRefreshToken(refreshToken);

        // Checking if token is in DB
        const tokenData = await TokenService.findRefreshToken(refreshToken);

        if (!userData || !tokenData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        // Returning from DTO all info about USER except password
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });

        // Save token to DB
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async getAllUsers() {
        // getting all users from DB
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new UserService();
