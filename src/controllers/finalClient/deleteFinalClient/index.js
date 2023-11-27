const FinalClient = require("../../../models/FinalClient");

const deleteFinalClient = async (req, res) => {
  try {
    const { id } = req.params;

    const finalClient = await FinalClient.findByIdAndUpdate(id, {
      banned: true,
    });

    return res
      .status(200)
      .json({
        message: "El cliente final ha sido borrado con éxito",
        finalClient,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al borrar al cliente final." });
  }
};

module.exports = deleteFinalClient;
