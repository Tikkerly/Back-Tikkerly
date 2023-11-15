const { response } = require("express");
const bcryptjs = require("bcrypt");
const User = require("../../models/User");
const ServiceAgent = require("../../models/ServiceAgent");
const { generarJWT, googleVerify } = require("../../helpers");

const loginAgent = async (email, password, res) => {
  try {
    // Verificar si el agente de servicio existe
    const agent = await ServiceAgent.findOne({ email });
    if (!agent) {
      return res.status(400).json({
        message: "Credenciales incorrectas.",
      });
    }

    // Verificar el estado del agente de servicio
    if (!agent.status) {
      return res.status(400).json({
        message: "Usuario inválido. Consulte con un administrador",
      });
    }
    // Validar contraseña
    const validPassword = bcryptjs.compareSync(password, agent.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
      });
    }
    // Generar token
    const token = generarJWT(agent.id);

    return res.status(200).json({
      user: agent,
      token,
    });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const login = async (req, res = response) => {
  const { email, password, isUser } = req.body;
  try {
    if (!isUser) return loginAgent(email, password, res);
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // SI el usuario está activo
    if (!user.status || !user.activeRegister) {
      return res.status(400).json({
        msg: "Usuario no activado / consulte el administrador",
      });
    }

    if (!user.activeRegister) {
      return res.status(400).json({
        msg: "Registro: Confirme su registro",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let user = await User.findOne({ correo });

    if (!user) {
      // Tengo que crearlo
      const data = {
        username: nombre,
        email: correo,
        password: ":P",
        img: img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Si el usuario en DB
    if (!user.status) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

const revalidateToken = async (req, res) => {
  const { id } = req.body;
  try {
    const newToken = await generarJWT(id);
    res.status(200).json(newToken);
  } catch (error) {
    return res.status(400).json({ msg: "Id no valido" });
  }
};

module.exports = {
  login,
  googleSignin,
  revalidateToken,
};
