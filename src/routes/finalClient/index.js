const { Router } = require("express");
const finalClientRoutes = Router();
const { finalClientControllers } = require("../../controllers");
const { validarJWT, fieldsValidate } = require("../../middlewares/index");
const { check } = require("express-validator");
const {
  existEmail,
  userExistById,
  existDocument,
  finalClientExistById,
} = require("../../helpers/customValidations/index");

finalClientRoutes.get("/", finalClientControllers.getFinalClients);

finalClientRoutes.post(
  "/registerfinalclient",
  [
    check("username", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").not().isEmpty(),
    check("document", "El documento de identidad es obligatorio")
      .not()
      .isEmpty(),
    check("document").custom(existDocument),
    fieldsValidate,
  ],
  finalClientControllers.registerFinalClient
);
finalClientRoutes.post(
  "/validateregister/:id",
  // [
  //   check("email", "EL email es obligatorio").not().isEmpty(),
  //   check("email").custom(existEmail),
  //   fieldsValidate,
  // ],
  finalClientControllers.validateRegister
);

finalClientRoutes.put(
  "/editfinalclient/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(finalClientExistById),
    fieldsValidate,
  ],
  finalClientControllers.editFinalClient
);

finalClientRoutes.get(
  "/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(finalClientExistById),
    fieldsValidate,
  ],
  finalClientControllers.getFinalClientByID
);

finalClientRoutes.post(
  "/deletefinalclient/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(finalClientExistById),
    fieldsValidate,
  ],
  finalClientControllers.deleteFinalClient
);

module.exports = finalClientRoutes;
