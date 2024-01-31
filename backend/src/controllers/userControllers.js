const tables = require("../tables");

const getUser = async (req, res, next) => {
  try {
    const user = await tables.user.readOne(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const getByEmail = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json("Please specify both Email and password");

  try {
    const user = await tables.user.findByEmail(email);
    if (user) {
      req.user_id = user.id;
      req.username = user.username;
      req.email = user.email;
      req.password_hash = user.password_hash;
      req.avatar = user.avatar;
      req.color = user.color;
      next();
    } else {
      res.status(404).send("Invalid Email");
    }
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res) => {
  res.status(200).json({
    id: req.user_id,
    username: req.username,
    email: req.email,
    avatar: req.avatar,
    color: req.color,
  });
};

module.exports = { getUser, getByEmail, userLogin };
