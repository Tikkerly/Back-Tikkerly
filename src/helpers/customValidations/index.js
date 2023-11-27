const User = require("../../models/User");
const FinalClient = require("../../models/FinalClient");
const ServiceAgent = require("../../models/ServiceAgent");
const Technician = require("../../models/Technician");

const existEmail = async (email = "") => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`El Correo ${email} ya existe`);
  }
};

const existDocument = async (document = "") => {
  const user = await User.findOne({ document });
  if (user) {
    throw new Error(`El documento ${document} ya existe`);
  }
};

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};
const serviceAgentExistById = async (id) => {
  const serviceAgentExist = await ServiceAgent.findById(id);
  if (!serviceAgentExist) {
    throw new Error(`El agente de servicio con id ${id} no existe`);
  }
};
const finalClientExistById = async (id) => {
  const finalClientExist = await FinalClient.findById(id);
  if (!finalClientExist) {
    throw new Error(`El cliente final con id ${id} no existe`);
  }
};
const technicianExistById = async (id) => {
  const technicianExist = await Technician.findById(id);
  if (!technicianExist) {
    throw new Error(`El técnico con id ${id} no existe`);
  }
};

module.exports = {
  existEmail,
  userExistById,
  existDocument,
  serviceAgentExistById,
  finalClientExistById,
  technicianExistById,
};
