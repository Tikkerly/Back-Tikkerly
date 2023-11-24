const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  username: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: [true, "El telefono es obligatorio"],
  },
  rol: {
    type: String,
    enum: ["Admin", "Client"],
  },
  documentType: {
    type: String,
    enum: ["NIT", "DNI", "PASAPORTE"],
  },
  document: {
    type: String,
    required: [true, "El valor del documento es obligatorio"],
  },
  personType: {
    type: String,
    required: true,
    emun: ["Juridica", "Natural"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  address: {
    type: String,
    required: [true, "La dirección es obligatoria."],
  },
  trialPeriod: {
    type: Boolean,
    default: true,
  },
  trialStartDate: {
    type: String,
    required: [true, "Debe haber un comienzo del periodo de prueba."],
  },
  trialEndDate: {
    type: String,
    required: [true, "Debe haber una finalización del periodo de prueba,"],
  },
  google: {
    type: Boolean,
    default: false,
  },
  activeRegister: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
