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

module.exports = { getUser };
