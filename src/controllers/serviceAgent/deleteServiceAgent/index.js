const ServiceAgent = require("../../../models/ServiceAgent");

const deleteServiceAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const serviceAgent = await ServiceAgent.findByIdAndUpdate(id, {
      banned: true,
    });

    return res
      .status(200)
      .json({
        message: "El agente de servicio ha sido borrado con éxito",
        serviceAgent,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al borrar el Agente de Servicio." });
  }
};

module.exports = deleteServiceAgent;
