const path = require("path");
const fs = require("fs");
require("dotenv").config();
const {
  hashPassword,
  sendPasswordRegisterEmail,
  uploadFile,
} = require("../../../helpers");
const { add, format } = require("date-fns");

const User = require("../../../models/User");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const registerUser = async (req, res) => {
  const actualDate = new Date();
  const endDate = add(actualDate, { days: 30 });
  const trialStartDate = format(actualDate, "dd/MM/yy");
  const trialEndDate = format(endDate, "dd/MM/yy");
  try {

    const {
      username,
      password,
      email,
      personType,
      phone,
      address,
      document,
      documentType,
    } = req.body;


    const encryptedPassword = hashPassword(password);

    const fileName = await uploadFile(req.files, undefined, "imgs");

    const rutaCarpetaUploads = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "imgs",
      fileName
    );

    const { secure_url } = await cloudinary.uploader.upload(
      rutaCarpetaUploads,
      {
        folder: `imgs/${username}`,
      }
    );

    const user = new User({
      username,
      password: encryptedPassword,
      personType,
      email,
      address,
      nit,
      img: secure_url,
      phone,
      trialStartDate,
      trialEndDate,
      rol: "Client",
    });

    await user.save();
    sendPasswordRegisterEmail(email, user._id);

    if (fs.existsSync(rutaCarpetaUploads)) {
      // Borrar el archivo
      fs.unlink(rutaCarpetaUploads, (error) => {
        if (error) {
          console.error("Error al borrar el archivo:", error);
        } else {
          console.log("Archivo borrado exitosamente.");
        }
      });
    } else {
      console.log("El archivo no existe.");
    }
    return res.status(200).json({
      message:
        "El usuario ha sido registrado. ¡Ve al email con el que te registraste para validar el registro!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const validateRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.activeRegister = true;
    user.save();
    return res
      .status(200)
      .json({ msg: "Usuario Validado con exito", user: user });
  } catch (error) {
    return res.status(400).json({ msg: "Error al validar registro" });
  }
};

module.exports = { registerUser, validateRegister };
