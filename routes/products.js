import express from "express"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", /*verifyAdmin,*/ createProduct);
router.put("/", /*verifyAdmin,*/ updateProduct);
router.delete("/", /*verifyAdmin,*/ deleteProduct);

export default router
