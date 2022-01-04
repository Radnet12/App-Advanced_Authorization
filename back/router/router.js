// Modules
const { body } = require("express-validator");
const Router = require("express").Router;

const router = new Router();

// Controllers
const UserController = require("../controllers/UserController");

// Middlewares
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 4, max: 32 }),
    UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activation);
router.get("/refresh", UserController.refresh);
router.get("/users", AuthMiddleware, UserController.getUsers);

module.exports = router;
