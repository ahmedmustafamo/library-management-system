const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const handleError = require('./../config/handleError')


const authController = {
  /**
  * @api {post} /auth/register Register a new user
  * @apiName RegisterUser
  * @apiGroup Auth
  *
  * @apiParam {String} username User's username.
  * @apiParam {String} email User's email.
  * @apiParam {String} password User's password.
  *
  * @apiSuccess {Number} id User's unique ID.
  * @apiSuccess {String} username User's username.
  * @apiSuccess {String} email User's email.
  * @apiSuccess {String} created_at User's account creation date.
  *
  * @apiError (Error 400) BadRequest Unable to register user.
  * @apiError (Error 500) InternalServerError Error while creating user.
  */
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      handleError(res, error, 'registering user')
    }
  },
  /**
     * @api {post} /auth/login Log in a user
     * @apiName LoginUser
     * @apiGroup Auth
     *
     * @apiParam {String} email User's email.
     * @apiParam {String} password User's password.
     *
     * @apiSuccess {String} token JWT token for authenticated user.
     *
     * @apiError (Error 401) Unauthorized Invalid credentials.
     * @apiError (Error 500) InternalServerError Error during login process.
     */
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
