import prisma from "../config/prisma.js";

export const createProduct = async (req, res) => {
try {
const { name, sku, price, stock } = req.body;
  const product = await prisma.product.create({
 data: {
name,
    sku,
price: Number(price),
stock: Number(stock),
},
  });
res.status(201).json(product);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const getProducts = async (req, res) => {
try {
const products = await prisma.product.findMany();
res.json(products);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, sku, price, stock } = req.body;

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        sku,
        price: Number(price),
        stock: Number(stock),
      },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    if (
      error?.message?.includes(
        "violates RESTRICT setting of foreign key constraint"
      )
    ) {
      return res.status(400).json({
        message:
          "Cannot delete product while orders reference it. Delete related orders first.",
      });
    }

    res.status(500).json({ message: error.message });
  }
};