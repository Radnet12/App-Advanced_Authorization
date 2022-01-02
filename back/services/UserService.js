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

class UserService {
    async registration(email, password) {
        // Checking if such email is already exist in DB
        const candidate = await UserModel.findOne({ email });

        // If exist throw error
        if (candidate) {
            throw new Error(
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
        await MailService.sendActivationMail(email, activationLink);

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
}

module.exports = new UserService();
