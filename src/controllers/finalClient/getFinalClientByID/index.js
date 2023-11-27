const FinalClient = require("../../../models/FinalClient");

const getFinalClientByID = async (req, res) => {
  const { id } = req.params;
  try {
    const finalClient = await FinalClient.findById(id)
      .populate("company_id")
      .populate("serviceClient_id");
    return res.status(200).json(finalClient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getFinalClientByID;
