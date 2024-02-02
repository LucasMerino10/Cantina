const argon = require("argon2");
const jwt = require("jsonwebtoken");

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (await argon.verify(req.password_hash, password)) {
    const token = jwt.sign(
      {
        id: req.user_id,
        username: req.username,
        email: req.email,
        avatar: req.avatar,
        color: req.color,
      },
      process.env.APP_SECRET,
      { expiresIn: "24h" }
    );
    res.cookie("access_token", token, { httpOnly: true });
    next();
  } else {
    res.status(400).send("Invalid password");
  }
};

module.exports = validatePassword;
