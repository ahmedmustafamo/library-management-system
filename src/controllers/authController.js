const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const handleError = require('./../config/handleError')


const authController = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      handleError(res, error, 'registering user')
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  },
};

module.exports = authController;
