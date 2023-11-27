const {
  hashPassword,
  generarJWT,
  sendPasswordResetEmail,
  validateJWTEmail,
} = require("../../../helpers/index");
const User = require("../../../models/User");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    const token = await generarJWT(user.id);
    sendPasswordResetEmail(email, token);
    return res.status(200).json({
      message: "Revisa tu email para restablecerla contraseña",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const passwordRecovery = async (req, res) => {
  const { token, password } = req.body;

  let newPassword = "";

  try {
    const user = await validateJWTEmail(token.id);

    if (!user) return res.status(500).json({ message: "Token no valido" });
    if (password) {
      newPassword = hashPassword(password);
    }
    await User.findByIdAndUpdate(user.id, {
      password: newPassword,
    });
    return res.status(200).json({ message: "Cambio de contraseña exitoso" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error en la peticion, consulte al administrador" });
  }
};

module.exports = { forgotPassword, passwordRecovery };
