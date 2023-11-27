const path = require("path");
const fs = require("fs");
const {
  hashPassword,
  sendPasswordRegisterEmail,
  uploadFile,
} = require("../../../helpers");

const ServiceAgent = require("../../../models/ServiceAgent");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

const registerServiceAgent = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      // img,
      document,
      documentType,
      phone,
      company_id,
    } = req.body;
    const encryptedPassword = hashPassword(password);

    // const fileName = await uploadFile(req.files, undefined, "imgs");

    const rutaCarpetaUploads = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "imgs",
      // fileName
    );

    // const { secure_url } = await cloudinary.uploader.upload(

    //   rutaCarpetaUploads,
    //   {
    //     folder: `imgs/agents/${username}`,
    //   },
    //   (result, error) => {
    //     console.log(error.message);
    //     console.log(result);
    //   }
    // );
      
    
    const serviceAgent = new ServiceAgent({
      username,
      email,
      password: encryptedPassword,
      document,
      documentType,
      phone,
      // img: secure_url,
      company_id
    });

    await serviceAgent.save();
    // sendPasswordRegisterEmail(email, serviceAgent._id);

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
    return res.status(400).json({ message: error.message });
  }
};

const validateRegister = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceAgent = await ServiceAgent.findById(id);
    serviceAgent.activeRegister = true;
    serviceAgent.save();
    return res
      .status(200)
      .json({ msg: "Usuario Validado con exito", user: user });
  } catch (error) {
    return res.status(400).json({ msg: "Error al validar registro" });
  }
};

module.exports = { registerServiceAgent, validateRegister };
