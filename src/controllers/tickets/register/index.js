const { sendTicketEmail } = require("../../../helpers/sendMail");
const Ticket = require("../../../models/Ticket");
const { format } = require("date-fns");
const User = require("../../../models/User");

const registerTicket = async (req, res) => {
  const actualDate = new Date();
  const registerDate = format(actualDate, "dd/MM/yy");
  try {
    const {
      serviceType,
      serviceDescription,
      startDate,
      company_id,
      technician_id,
      finalClient_id,
      serviceClient_id,
      paymentMethod,
      ammount,
      cost,
      others,
    } = req.body;
    const utility = ammount - cost - others;
    const IVA = 0.19 * ammount;
    const ticket = new Ticket({
      serviceDescription,
      serviceType,
      ammount,
      startDate,
      cost,
      utility,
      others,
      IVA,
      paymentMethod,
      registerDate,
      company_id,
      technician_id,
      finalClient_id,
      serviceClient_id,
    });
    await ticket.save();

    const user = await User.findById(company_id);
    //console.log(user);
    sendTicketEmail(user.email);

    return res.status(201).json({ message: "Ticket registrado con éxito" });
  } catch ({ message }) {
    return res.status(500).json(message);
  }
};

module.exports = registerTicket;
