const { Schema, model } = require("mongoose");

const TicketSchema = Schema({
  // Consecutivo Interno
  internalConsecutive: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  status: {
    type: String,
    enum: [
      "Pendiente",
      "Aprobado",
      "Cancelado",
      "En progreso",
      "Completado",
      "Cerrado",
      "Rechazado",
    ],
    default: "Pendiente",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "EL cliente es obligatorio"],
  },
  technician_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  //   Crear modelo de servicios
  service: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  realizationDate: {
    type: Date,
  },
  image: {
    type: String,
  },
  observations: {
    type: String,
  },

  technicianRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Ticket", TicketSchema);
