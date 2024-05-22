import Delivery from "../models/Delivery.js";
import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
    try {
        let products = await Product.fetchAll();
        let care = [];
        let styling = [];
        let equipment = [];

        for(let p of products) {
            if (p.idKategorija == 0) {
                care.push(p);
            } else if (p.idKategorija == 1) {
                styling.push(p);
            } else {
                equipment.push(p)
            }
        }

        res.render("../views/products", {
                care: care,
                styling: styling,
                equipment: equipment
            }
        )
    } catch(err) {
        next(err)
    }
};


export const getProduct = async (req, res, next) => {
    try {
        let product = await Product.fetchByProductId(req.query.id);
        let deliveries = await Delivery.fetchByProductId(req.query.id);

        console.log(deliveries);

        res.render("../views/updateProduct", {
                product: product,
                deliveries: deliveries,
                success: req.query.success
            }
        )
    } catch(err) {
        next(err)
    }
};

export const addProductTemplate = async (req, res, next) => {
    try {
        res.render("../views/addProduct")
    } catch(err) {
        next(err)
    }
};

export const createProduct = async (req, res, next) => {
    try {
        let newProduct = new Product (
            req.body.id_kategorija,
            req.body.ime,
            req.body.opis,
            req.body.cijena
        )

        console.log(newProduct);

        await newProduct.persist()
        res.redirect("/products")
    } catch(err) {
        next(err)
    }
};


export const updateProduct = async (req, res, next) => {
    try {
        let newProduct = new Product (
            req.body.id_kategorija,
            req.body.ime,
            req.body.opis,
            req.body.cijena,
        )
        newProduct.id = req.body.id

        await Product.updateProduct(newProduct)
        res.redirect(`/products/updateProduct?id=${req.body.id}&success=true`)
    } catch(err) {
        next(err)
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.deleteProduct(req.query.id)
        res.status(200).json({success:true})
    } catch(err) {
        next(err)
    }
};


export const addProductToFavorites = async (req, res, next) => {
    try {
        await Product.addToFavorites(req.query.user_id, req.query.product_id)
        res.status(200).json({success:true})
    } catch(err) {
        next(err)
    }
};


export const removeProductFromFavorites = async (req, res, next) => {
    try {
        await Product.removeFromFavorites(req.query.user_id, req.query.product_id)
        res.status(200).json({success:true})
    } catch(err) {
        next(err)
    }
};