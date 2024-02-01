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

  async readAll() {
    const [result] = await this.database.query(
      `SELECT id, username, email, avatar, color FROM user`
    );

    return result;
  }

  async findByEmail(email) {
    const [result] = await this.database.query(
      `
    SELECT * from user WHERE email = ?`,
      [email]
    );

    return result[0];
  }

  async edit(id, username, email, avatar, color) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET username = ?, email = ?, avatar = ?, color = ? 
    WHERE id = ?`,
      [username, email, avatar, color, id]
    );

    return result;
  }
}

module.exports = UserManager;
