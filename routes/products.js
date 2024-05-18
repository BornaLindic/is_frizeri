import express from "express"
import { addProductTemplate,
         addProductToFavorites,
         createProduct,
         deleteProduct,
         getProduct,
         getProducts,
         getProductsAdmin,
         removeProductFromFavorites,
         updateProduct } from "../controllers/products.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/admin", /*verifyAdmin,*/ getProductsAdmin);
router.get("/updateProduct", /*verifyAdmin,*/ getProduct);
router.get("/addProduct", /*verifyAdmin,*/ addProductTemplate);
router.get("/favor", /*verifyUser,*/ addProductToFavorites);
router.get("/unfavor", /*verifyUser,*/ removeProductFromFavorites);

router.post("/", /*verifyAdmin,*/ createProduct);
router.post("/putProduct", /*verifyAdmin,*/ updateProduct);
router.delete("/", /*verifyAdmin,*/ deleteProduct);

export default router
