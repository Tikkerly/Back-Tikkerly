const { hashPassword } = require("../../../helpers/index");
const ServiceAgent = require("../../../models/ServiceAgent");

const editServiceAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, document, documentType, password, ...rest } = req.body;
    if (password) {
      rest.password = hashPassword(password);
    } else {
      delete rest.password;
    }
    const serviceAgent = await ServiceAgent.findByIdAndUpdate(id, rest, { new: true });
    return res
      .status(200)
      .json(serviceAgent);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = editServiceAgent;
