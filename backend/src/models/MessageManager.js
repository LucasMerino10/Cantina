/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  async read() {
    const [messages] = await this.database.query(
      `SELECT id, DATE_FORMAT(message_date, "%d/%m %H:%i") AS message_date, content, user_id FROM ${this.table}`
    );

    return messages;
  }

  async add(content, message_date, user_id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (content, message_date, user_id) 
                                              VALUES(?, ?, ?)`,
      [content, message_date, user_id]
    );

    return result.insertId;
  }
}

module.exports = MessageManager;
