import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getProducts);

router.get("/:id", protect, getProductById);

router.post(
  "/",
  protect,
  authorize("admin"),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteProduct
);

export default router;