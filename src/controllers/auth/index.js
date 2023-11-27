const { response } = require("express");
const bcryptjs = require("bcrypt");
const User = require("../../models/User");
const { generarJWT, googleVerify } = require("../../helpers");
const { add, format } = require("date-fns");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
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
  const actualDate = new Date();
  const endDate = add(actualDate, { days: 30 });
  const trialStartDate = format(actualDate, "dd/MM/yy");
  const trialEndDate = format(endDate, "dd/MM/yy");
  const { credential } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(credential);

    let user = await User.findOne({ email: correo });

    if (!user) {
      // Tengo que crearlo
      const data = {
        username: nombre,
        email: correo,
        password: ":P",
        img: img,
        google: true,
        address: "Debes actualizar la dirección",
        phone: "Debes actualizar el telefono",
        nit: "debes actualizar el NIT",
        rol: "Client",
        personType: "Natural",
        trialStartDate,
        trialEndDate,
        trialPeriod: true,
        activeRegister: true,
        status: true,
        isPaid: false,
      };

      user = new User(data);
      await user.save();
    }

    //Si el usuario en DB
    if (!user.status) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    //Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json(error.message);
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
