import Delivery from "../models/Delivery.js";
import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";


export const getDelivery = async (req, res, next) => {
    try {
        let product = await Product.fetchByProductId(req.query.product_id);
        let delivery = await Delivery.fetchByProductAndSupplierId(req.query.product_id, req.query.supplier_id);

        res.render("../views/updateDelivery", {
                product: product,
                delivery: delivery,
                success: req.query.success
            }
        )
    } catch(err) {
        next(err)
    }
};


export const deleteDelivery = async (req, res, next) => {
    try {
        await Delivery.deleteDelivery(req.query.id_product, req.query.id_supplier)
        res.status(200).json({success:true})
    } catch(err) {
        next(err)
    }
};

export const addDeliveryTemplate = async (req, res, next) => {
    try {
        let product = await Product.fetchByProductId(req.query.product_id);
        let suppliers = await Supplier.fetchAll()

        res.render("../views/addDelivery", {
            product: product,
            suppliers: suppliers
        });
    } catch(err) {
        next(err)
    }
};


export const createDelivery = async (req, res, next) => {
    try {
        let supplier = await Supplier.fetchBySupplierId(req.body.id_dobavljaca)

        let newDelivery = new Delivery (
            supplier,
            req.body.cijena,
            req.body.dana_isporuke
        )

        console.log(newDelivery)

        await newDelivery.persist(req.body.product_id)
        res.redirect("/products/updateProduct?id=" + req.body.product_id)
    } catch(err) {
        next(err)
    }
};


export const updateDelivery = async (req, res, next) => {
    try {
        let supplier = await Supplier.fetchBySupplierId(req.body.supplier_id)
        let newDelivery = new Delivery (
            supplier,
            req.body.cijena,
            req.body.dana_isporuke
        )

        await Delivery.updateDelivery(newDelivery, req.body.product_id)
        res.redirect(`/products/updateProduct?id=${req.body.product_id}&success=true`)
    } catch(err) {
        next(err)
    }
};