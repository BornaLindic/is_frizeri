import express from "express"
import { verifyAdmin } from "../utils/verify.js";
import { addDeliveryTemplate, createDelivery, deleteDelivery, getDelivery, updateDelivery } from "../controllers/deliveries.js";

const router = express.Router();

router.get("/addDelivery", /*verifyAdmin,*/ addDeliveryTemplate);
router.get("/updateDelivery", /*verifyAdmin,*/ getDelivery);

router.post("/", /*verifyAdmin,*/ createDelivery);
router.post("/putDelivery", /*verifyAdmin,*/ updateDelivery);
router.delete("/", /*verifyAdmin,*/ deleteDelivery);


export default router
