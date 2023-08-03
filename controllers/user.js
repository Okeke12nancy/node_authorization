const User = require("../models/user");

class UserController {
  async findAll(req, res) {
    const users = await User.find({});

    if (!users) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Users found",
      data: users,
    });
  }
}

module.exports = new UserController();
