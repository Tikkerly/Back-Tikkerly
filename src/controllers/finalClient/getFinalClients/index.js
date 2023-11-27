const FinalClient = require("../../../models/FinalClient");

const getFinalClients = async (req, res) => {
  try {
    const [total, finalClients] = await Promise.all([
      FinalClient.countDocuments(),
      FinalClient.find().populate("company_id").populate("serviceClient_id"),
    ]);
    return res.status(200).json({ total, finalClients });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getFinalClients;
