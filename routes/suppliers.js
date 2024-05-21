import express from "express"
import { addSupplierTemplate, createSupplier, deleteSupplier, getSupplier, getSuppliers, updateSupplier } from "../controllers/suppliers.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

router.get("/", getSuppliers);
router.get("/updateSupplier", /*verifyAdmin,*/ getSupplier);
router.get("/addSupplier", /*verifyAdmin,*/ addSupplierTemplate);

router.post("/", /*verifyAdmin,*/ createSupplier);
router.post("/putSupplier", /*verifyAdmin,*/ updateSupplier);
router.delete("/", /*verifyAdmin,*/ deleteSupplier);

export default router
