const { Schema, model } = require("mongoose");

const TicketSchema = Schema({
  internalConsecutive: {
    type: Number,
  },
  serviceType: {
    type: String,
    required: [true, "Se requiere especificar el tipo de servicio."],
  },
  serviceDescription: {
    type: String,
    required: [true, "Se requiere una descripción del servicio."],
  },
  registerDate: {
    type: String,
    required: [true, "Se requiere una fecha de registro."],
  },
  startDate: {
    type: String,
    required: [true, "Se requiere una fecha de agendamiento."],
  },
  endDate: {
    type: String,
    default: "",
  },
  ammount: {
    type: Number,
    required: [true, "Se requiere un monto."],
  },
  cost: {
    type: Number,
    required: [true, "Se requiere un costo."],
  },
  utility: {
    type: Number,
    required: [true, "Se requiere especificar la utilidad."],
  },
  others: {
    type: Number,
    required: [true, "Se requiere especificar otros costos."],
  },
  IVA: {
    type: Number,
    required: [true, "Se requiere especificar el IVA."],
  },
  paymentMethod: {
    type: String,
    required: [true, "Se requiere especificar el tipo de pago."],
  },
  status: {
    type: Boolean,
    default: true,
  },
  ispaid: {
    type: Boolean,
    default: false,
  },
  ticketStatus: {
    type: String,
    enum: [
      "Pendiente",
      "Aprobado",
      "Cancelado",
      "En proceso",
      "Completado",
      "Cerrado",
      "Rechazado",
    ],
    default: "Pendiente",
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Es obligatorio asignar la compañía."],
  },
  serviceClient_id: {
    type: Schema.Types.ObjectId,
    ref: "ServiceAgent",
    required: [true, "Es obligatorio asignar un cliente de servicio."],
  },
  technician_id: {
    type: Schema.Types.ObjectId,
    ref: "Technician",
    required: [true, "Es obligatorio asignar un técnico."],
  },
  finalClient_id: {
    type: Schema.Types.ObjectId,
    ref: "FinalClient",
    required: [true, "Es obligatorio asignar un cliente final."],
  },
});

TicketSchema.pre("save", async function (next) {
  if (!this.internalConsecutive) {
    const lastTicket = await this.constructor.findOne(
      {},
      {},
      { sort: { internalConsecutive: -1 } }
    );
    this.internalConsecutive = lastTicket
      ? lastTicket.internalConsecutive + 1
      : 1;
  }
  next();
});

TicketSchema.methods.toJSON = function () {
  const { __v, ...user } = this.toObject();
  return user;
};

module.exports = model("Ticket", TicketSchema);
