const ticketRoutes = require("express").Router();
const { ticketControllers } = require("../../controllers/index");
const { check } = require("express-validator");
const { validarJWT, fieldsValidate } = require("../../middlewares/index");

ticketRoutes.get(
  "/company/:id",
  validarJWT,
  ticketControllers.getTicketsByUser
);

ticketRoutes.get(
  "/agent/:id", 
  validarJWT, 
  ticketControllers.getTicketsByAgent
);

ticketRoutes.get(
  "/:id",
  ticketControllers.getTicketById
);

ticketRoutes.get(
  "/technician/:id",
  ticketControllers.getTicketsByTechnician
)

ticketRoutes.post(
  "/registerticket",

  ticketControllers.registerTicket
);

ticketRoutes.delete(
  "/deleteticket/:id",
  validarJWT,
  [check("id", "El id no es válido").isMongoId(), fieldsValidate],
  ticketControllers.deleteTicket
);
ticketRoutes.put(
  "/updateticket/:id",
  [check("id", "El id no es válido").isMongoId(), fieldsValidate],
  ticketControllers.updateTicket
);



module.exports = ticketRoutes;
