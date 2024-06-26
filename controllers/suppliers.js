import Supplier from "../models/Supplier.js";
import { checkEmail } from "../utils/checkEmail.js";
import { createError } from "../utils/error.js";

export const getSuppliers = async (req, res, next) => {
    try {
        let suppliers = await Supplier.fetchAll();

        if(req.query.search) {
            suppliers = suppliers.filter((s) => {return s.ime.toUpperCase() == req.query.search.toUpperCase()});
        }

        res.render("../views/suppliers", {
                suppliers: suppliers,
                search: req.query.search
            }
        )
    } catch(err) {
        next(err)
    }
};


export const getSupplier = async (req, res, next) => {
    try {
        let supplier = await Supplier.fetchBySupplierId(req.query.id)

        res.render("../views/updateSupplier", {
                supplier: supplier,
                success: req.query.success
            }
        )
    } catch(err) {
        next(err)
    }
};

export const addSupplierTemplate = async (req, res, next) => {
    try {
        res.render("../views/addSupplier")
    } catch(err) {
        next(err)
    }
};

export const createSupplier = async (req, res, next) => {
    try {

        if(!checkEmail(req.body.email)) {
            next(createError(400, 'Bad email'))
            return
        }

        let newSupplier = new Supplier (
            req.body.ime,
            req.body.email
        )

        await newSupplier.persist()
        res.redirect("/suppliers")
    } catch(err) {
        next(err)
    }
};


export const updateSupplier = async (req, res, next) => {
    try {
        if(!checkEmail(req.body.email)) {
            next(createError(400, 'Bad email'))
            return
        }

        let newSupplier = new Supplier (
            req.body.ime,
            req.body.email
        )
        newSupplier.id = req.body.id

        await Supplier.updateSupplier(newSupplier)
        res.redirect(`/suppliers/updateSupplier?id=${req.body.id}&success=true`)
    } catch(err) {
        next(err)
    }
};

export const deleteSupplier = async (req, res, next) => {
    try {
        await Supplier.deleteSupplier(req.query.id)
        res.status(200).json({success:true})
    } catch(err) {
        next(err)
    }
};