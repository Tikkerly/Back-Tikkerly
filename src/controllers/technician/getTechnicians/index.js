const Technician = require("../../../models/Technician");

const getTechnicians = async (req, res) => {
  const { _id } = req.params
  try {
    const [total, technicians] = await Promise.all([
      Technician.countDocuments({ company_id: _id }),
      Technician.find({ company_id: _id })
        .populate("company_id")
        .populate("serviceClient_id"),
    ]);
    return res.status(200).json({ total, technicians });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getTechnicians;
