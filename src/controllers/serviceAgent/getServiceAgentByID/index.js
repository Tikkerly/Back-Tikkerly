const ServiceAgent = require("../../../models/ServiceAgent");

const getServiceAgentByID = async (req, res) => {
  const { id } = req.params;
  try {
    const serviceAgent = await ServiceAgent.findById(id).populate("company_id");
    return res.status(200).json(serviceAgent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getServiceAgentByID;
