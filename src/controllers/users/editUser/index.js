const { hashPassword } = require("../../../helpers/index");
const User = require("../../../models/User");

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;
    if (password) {
      rest.password = hashPassword(password);
    }
    const user = await User.findByIdAndUpdate(id, rest, { new: true });
    return res
      .status(200)
      .json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = editUser;
