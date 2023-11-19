const FinalClient = require("../../../models/FinalClient");

const getTechnicianByID = async (req, res) => {
  const { id } = req.params;
  try {
    const finalClient = await FinalClient.findById(id);
    return res.status(200).json(finalClient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getTechnicianByID;