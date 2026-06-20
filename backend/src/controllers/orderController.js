import prisma from "../config/prisma.js";

export const createOrder = async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    const order = await prisma.order.create({
      data: {
        customerId: Number(customerId),
        productId: Number(productId),
        quantity: Number(quantity),
      },
    });

    await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        stock: product.stock - quantity,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        product: true,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
