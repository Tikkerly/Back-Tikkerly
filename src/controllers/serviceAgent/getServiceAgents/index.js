const ServiceAgent = require("../../../models/ServiceAgent");

const getServiceAgents = async (req, res) => {
  try {
    const [total, serviceAgent] = await Promise.all([
      ServiceAgent.countDocuments(),
      ServiceAgent.find()
      .populate("company_id"),
    ]);
    return res.status(200).json({ total, serviceAgent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getServiceAgents;
