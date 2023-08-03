const User = require("../models/user");
// const bcrypt = require("bcryptjs");

class AuthController {
  // Register a User
  async register(req, res) {
    try {
      const createData = {
        ...req.body,
      };
      const user = await User.create(createData);

      // generate token
      const token = await user.createJWT();
      return res.status(200).json({
        success: true,
        message: "user registered successfully",
        data: { user, token },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send("user registration failed");
    }
  }

  // Log In User
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne(
        {
          email,
        },
        "+password"
      );

      console.log(user);

      if (!user) {
        return res.status(400).send("invalid email or password", {});
      }

      const passwordMatch = await user.comparePassword(password);

      if (!passwordMatch) {
        return res.status(400).send("invalid email or password");
      }

      // generate token
      const token = await user.createJWT();

      console.log(token);
      return res.status(200).json({
        success: true,
        message: "user loggedin successfully",
        data: { user, token },
      });
    } catch (e) {
      return res.status(500).send("login failed");
    }
  }
}

module.exports = new AuthController();
