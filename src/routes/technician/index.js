const { Router } = require("express");
const technicianRoutes = Router();
const { technicianControllers } = require("../../controllers");
const { validarJWT, fieldsValidate } = require("../../middlewares/index");
const { check } = require("express-validator");
const {
  technicianExistById,
  existDocument,
} = require("../../helpers/customValidations/index");

technicianRoutes.get("/", technicianControllers.getTechnicians);

technicianRoutes.post(
  "/registertechnician",
  [
    check("username", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("document", "El documento de identidad es obligatorio").not().isEmpty(),
    check("document").custom(existDocument),

    fieldsValidate,
  ],
  technicianControllers.registerTechnician
);

technicianRoutes.put(
  "/edittechnician/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(technicianExistById),
    fieldsValidate,
  ],
  technicianControllers.editTechnician
);

technicianRoutes.get(
  "/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(technicianExistById),
    fieldsValidate,
  ],
  technicianControllers.getTechnicianByID
);

technicianRoutes.delete(
  "/deletetechnician/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(technicianExistById),
    fieldsValidate,
  ],
  technicianControllers.deleteTechnician
);

module.exports = technicianRoutes;
