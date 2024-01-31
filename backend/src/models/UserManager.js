const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async readOne(id) {
    const [result] = await this.database.query(
      `SELECT id, username, email, avatar, color FROM user
      WHERE id = ?`,
      [id]
    );

    return result[0];
  }

  async findByEmail(email) {
    const [result] = await this.database.query(
      `
    SELECT * from user WHERE email = ?`,
      [email]
    );

    return result[0];
  }
}

module.exports = UserManager;
