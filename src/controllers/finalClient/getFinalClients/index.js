const FinalClient = require("../../../models/FinalClient");

const getFinalClients = async (req, res) => {
  const { _id } = req.params;
  try {
    const [total, finalClients] = await Promise.all([
      FinalClient.countDocuments({ company_id: _id }),
      FinalClient.find({ company_id: _id })
        .populate("company_id")
        .populate("serviceClient_id"),
    ]);
    return res.status(200).json({ total, finalClients });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getFinalClients;
