const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const userControllers = require("./controllers/userControllers");
const messageControllers = require("./controllers/messageControllers");

router.get("/user/:id", userControllers.getUser);

router.get("/messages", messageControllers.getMessages);
router.post("/messages", messageControllers.addMessage);

/* ************************************************************************* */

module.exports = router;
