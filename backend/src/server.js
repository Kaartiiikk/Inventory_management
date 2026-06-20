import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
  app.use(cors());
app.use(express.json());
    app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
  app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
res.json({
message: "Inventory API Running",
});
});

const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
  });
