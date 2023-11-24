const Ticket = require("../../../models/Ticket");
const User = require("../../../models/User");

// Users = Company
// api/v1/tickets/company/:id
const getTicketsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ company_id: id }),
      Ticket.find({ company_id: id })
        .populate("company_id")
        .populate("finalClient_id")
        .populate("serviceClient_id")
        .populate("technician_id"),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
// api/v1/tickets/agent/:id
const getTicketsByAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ serviceClient_id: id }),
      Ticket.find({ serviceClient_id: id })
        .populate("company_id")
        .populate("finalClient_id")
        .populate("serviceClient_id")
        .populate("technician_id"),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id)
    return res.status(200).json(ticket);  
  } catch ({message}) {
    return res.status(500).json({ message });
  }
};

const getTicketsByTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ technician_id: id }),
      Ticket.find({ technician_id: id })
        .populate("company_id")
        .populate("finalClient_id")
        .populate("serviceClient_id")
        .populate("technician_id"),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  getTicketsByUser,
  getTicketsByAgent,
  getTicketById,
  getTicketsByTechnician
};
