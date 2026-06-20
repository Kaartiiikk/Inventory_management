import express from "express";
import { createOrder, getOrders, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
  router.get("/", getOrders);
router.delete("/:id", deleteOrder);

export default router;
