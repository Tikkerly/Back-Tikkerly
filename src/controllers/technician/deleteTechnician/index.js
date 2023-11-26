const Technician = require("../../../models/Technician");

const deleteTechnician = async (req, res) => {
  try {
    const { id } = req.params;

    const technician = await Technician.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "El técnico ha sido borrado con éxito" });
  } catch (error) {
    return res.status(400).json({ message: "Error al borrar al técnico." });
  }
};

module.exports = deleteTechnician;
