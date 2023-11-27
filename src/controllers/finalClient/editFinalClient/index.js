const FinalClient = require("../../../models/FinalClient");

const editFinalClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, document, ...rest } = req.body;
    const finalClient = await FinalClient.findByIdAndUpdate(id, rest, { new: true });
    return res
      .status(200)
      .json(finalClient);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = editFinalClient;
