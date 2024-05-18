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


export const getProductsAdmin = async (req, res, next) => {
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

        res.render("../views/productsAdmin", {
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
        let product = await Product.fetchByProductId(req.query.id)

        if (product.idKategorija == 0) {
            product.kategorija = "Njega";
        } else if (product.idKategorija == 1) {
            product.kategorija = "Styling";
        } else {
            product.kategorija = "Operam";
        }

        res.render("../views/updateProduct", {
                product: product
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
        )
        newProduct.id = req.body.id

        console.log

        await Product.updateProduct(newProduct)
        res.status(200).json(JSON.stringify(newProduct))
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