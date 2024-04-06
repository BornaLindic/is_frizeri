import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
    try {
        let products = await Product.fetchAll();
        res.status(200).json(JSON.stringify(products))
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
            req.body.cijena,
            req.body.slika
        )

        await newProduct.persist()
        res.status(200).json(JSON.stringify(newProduct))
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
            req.body.slika
        )
        newProduct.id = req.body.id

        await Product.updateProduct(newProduct)
        res.status(200).json(JSON.stringify(newProduct))
    } catch(err) {
        next(err)
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.deleteProduct(req.body.id)
        res.status(200).json({success:true})
    } catch(err) {
        next(err)
    }
};