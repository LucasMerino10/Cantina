/* eslint-disable camelcase */
const tables = require("../tables");

const getMessages = async (req, res, next) => {
  try {
    const messages = await tables.message.read();

    if (messages) {
      res.status(200).json(messages);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const addMessage = async (req, res, next) => {
  const { content, message_date, user_id } = req.body;

  try {
    const result = await tables.message.add(content, message_date, user_id);

    if (result) {
      res.status(202).json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getMessages, addMessage };
