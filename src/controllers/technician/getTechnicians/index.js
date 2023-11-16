const Technician = require("../../../models/Technician");

const getTechnicians = async (req, res) => {
  try {
    const [total, technicians] = await Promise.all([
      Technician.countDocuments(),
      Technician.find(),
    ]);
    return res.status(200).json({ total, technicians });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getTechnicians;
