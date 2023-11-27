const { Router } = require("express");
const userRoutes = Router();
const { userControllers } = require("../../controllers");
const { validarJWT, fieldsValidate } = require("../../middlewares/index");
const { check } = require("express-validator");
const {
  existEmail,
  userExistById,
} = require("../../helpers/customValidations/index");

userRoutes.get("/", validarJWT, userControllers.getUsers);

userRoutes.post(
  "/registeruser",
  [
    check("nit", "El NIT es obligatorio").not().isEmpty(),
    check("username", "EL nombre es obligatorio").not().isEmpty(),
    check("email", "EL email es obligatorio").not().isEmpty(),
    check("email").custom(existEmail),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    fieldsValidate,
  ],
  userControllers.registerUser
);
userRoutes.post(
  "/forgotpassword",
  [check("email", "EL email es obligatorio").not().isEmpty(), fieldsValidate],
  userControllers.forgotPassword
);
userRoutes.post("/passwordrecovery", userControllers.passwordRecovery);
userRoutes.post(
  "/validateregister/:id",
  // [
  //   check("email", "EL email es obligatorio").not().isEmpty(),
  //   check("email").custom(existEmail),
  //   fieldsValidate,
  // ],
  userControllers.validateRegister
);

userRoutes.put(
  "/edituser/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  userControllers.editUser
);

userRoutes.post(
  "/:id",

  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  userControllers.getUser
);

userRoutes.delete(
  "/deleteuser/:id",
  validarJWT,
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(userExistById),
    fieldsValidate,
  ],
  userControllers.deleteUser
);

module.exports = userRoutes;
