const Technician = require("../../../models/Technician");

const getTechnicianByID = async (req, res) => {
  const { id } = req.params;
  try {
    const technician = await Technician.findById(id)
      .populate("company_id")
      .populate("serviceClient_id");
    return res.status(200).json(technician);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getTechnicianByID;
