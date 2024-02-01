const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const userControllers = require("./controllers/userControllers");
const messageControllers = require("./controllers/messageControllers");

const validatePassword = require("./middlewares/validatePassword");

router.get("/user", userControllers.getAllUsers);
router.get("/user/:id", userControllers.getUser);

router.get("/messages", messageControllers.getMessages);
router.post("/messages", messageControllers.addMessage);

router.post(
  "/user/login",
  userControllers.getByEmail,
  validatePassword,
  userControllers.userLogin
);

/* ************************************************************************* */

module.exports = router;
