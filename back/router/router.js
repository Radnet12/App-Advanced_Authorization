const Router = require("express").Router;

const router = new Router();

// Controllers
const UserController = require("../controllers/UserController");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activation);
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);

module.exports = router;