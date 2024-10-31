const pool = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  create: async (user) => {
    const { username, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
      [username, email, hashedPassword]
    );
    return result.rows[0];
  },
  
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
};

module.exports = User;
