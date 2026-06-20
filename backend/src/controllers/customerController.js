import prisma from "../config/prisma.js";

export const createCustomer = async (req, res) => {
try {
const { name, email } = req.body;
  const customer = await prisma.customer.create({
data: {
name,
email,
},
  });
res.status(201).json(customer);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const getCustomers = async (req, res) => {
try {
const customers = await prisma.customer.findMany();
res.json(customers);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Customer deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
