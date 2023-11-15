const Ticket = require("../../../models/Ticket");
const User = require("../../../models/User");

// Users = Company
// api/v1/tickets/
const getAllTickets = async (req, res) => {
  try {
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({}),
      Ticket.find({}),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

// api/v1/tickets/user/:id
const getTicketsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [total, tickets] = await Promise.all([
      Ticket.countDocuments({ company_id: id }),
      Ticket.find({ company_id: id }),
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
      Ticket.find({ serviceClient_id: id }),
    ]);
    return res.status(200).json({ total, tickets });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};

module.exports = {
  getTicketsByUser,
  getTicketsByAgent,
};
