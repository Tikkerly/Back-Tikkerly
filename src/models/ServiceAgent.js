const { Schema, model } = require("mongoose");

const ServiceAgentSchema = Schema({

  username: {
    type: String,
    required: [true, "Se requiere un nombre de usuario."],
  },
  email: {
    type: String,
    required: [true, "Se requiere un email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Se requiere una contraseña."],
  },
  document: {
    type: String,
    required: [true, "Se requiere un documento de identificación."],
  },
  documentType: {
    type: String,
    enum: ["NIT", "DNI", "PASAPORTE"],
  },
  phone: {
    type: String,
    required: [true, "Se requiere un número de contacto."],
  },
  status: {
    type: Boolean,
    default: true,
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Es obligatorio asignar la compañía."],
  },
  img: {
    type: String,
    default: "",
  },
  banned: {
    type: Boolean,
    default: false,
  },
});


ServiceAgentSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("ServiceAgent", ServiceAgentSchema);
