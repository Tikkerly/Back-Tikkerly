const { hashPassword } = require("../../../helpers/index");
const Technician = require("../../../models/Technician");

const editTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, document, documentType, ...rest } = req.body;
    const technician = await Technician.findByIdAndUpdate(id, rest, { new: true });
    return res
      .status(200)
      .json(technician);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = editTechnician;
