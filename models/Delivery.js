import { query } from '../db/dbPool.js'
import Supplier from "./Supplier.js"

export default class Delivery {

    constructor(supplier, buyingPrice, avgDaysToDeliver) {
        this.supplier = supplier
        this.buyingPrice = buyingPrice
        this.avgDaysToDeliver = avgDaysToDeliver
    }

    static async fetchByProductId(id) {

        let results = await dbGetDeliveriesByProductId(id)
        let deliveries = []

        for( let row of results ) {
            let supplier = new Supplier(row.ime, row.email);
            supplier.id = row.id_dobavljac;
            let newDelivery = new Delivery(supplier,
                                         row.nabavna_cijena,
                                         row.prsj_dana_isporuke);
            deliveries.push(newDelivery)
        }
        return deliveries
    }

    static async fetchByProductAndSupplierId(idProduct, idSupplier) {

        let results = await dbGetDeliveryByProductAndSupplierId(idProduct, idSupplier)
        let newDelivery = new Delivery()
        
        if (results.length > 0){
            let supplier = new Supplier(results[0].ime, results[0].email);
            supplier.id = results[0].id_dobavljac;
            newDelivery = new Delivery(supplier,
                                        results[0].nabavna_cijena,
                                        results[0].prsj_dana_isporuke);
        }
        return newDelivery
    }

    // azuriranje dostave
    static async updateDelivery(newDelivery, idProduct) {
        await dbUpdateDelivery(newDelivery, idProduct)
    }

    // brisanje dostave
    static async deleteDelivery(idProduct, idSupplier) {
        await dbDeleteDelivery(idProduct, idSupplier)
    }

    //pohrana dostave u bazu podataka
    async persist(idProduct) {
        try {
            await dbNewDelivery(this, idProduct)
        } catch(err) {
            console.log("ERROR persisting delivery data: " + JSON.stringify(this))
            throw err
        }
    }
}


const dbGetDeliveriesByProductId = async (id) => {
    const sql = `select d.ime, d.email, pd.nabavna_cijena, pd.prsj_dana_isporuke, pd.id_dobavljac
    from "TESTNI_SALON".proizvod p 
        join "TESTNI_SALON".proizvod_dobavljac pd
            on p."ID" = pd.id_proizvod
        join "TESTNI_SALON".dobavljac d
            on d."ID" = pd.id_dobavljac
    where p."ID" = ${id}`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting deliveries " + err);
        throw err
    }
};


const dbGetDeliveryByProductAndSupplierId = async (idProduct, idSupplier) => {
    const sql = `select d.ime, d.email, pd.nabavna_cijena, pd.prsj_dana_isporuke, pd.id_dobavljac
    from "TESTNI_SALON".proizvod p 
        join "TESTNI_SALON".proizvod_dobavljac pd
            on p."ID" = pd.id_proizvod
        join "TESTNI_SALON".dobavljac d
            on d."ID" = pd.id_dobavljac
    where p."ID" = ${idProduct} AND d."ID" = ${idSupplier}` ;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting delivery " + err);
        throw err
    }
};


const dbUpdateDelivery = async (newDelivery, idProduct) => {
    const sql = `UPDATE "TESTNI_SALON".proizvod_dobavljac SET
        NABAVNA_CIJENA = ${newDelivery.buyingPrice},
        PRSJ_DANA_ISPORUKE = ${newDelivery.avgDaysToDeliver}
        WHERE id_proizvod = ${idProduct} AND id_dobavljac = ${newDelivery.supplier.id}`;
    try {
        await query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbDeleteDelivery = async (idProduct, idSupplier) => {
    const sql = `DELETE  FROM "TESTNI_SALON".proizvod_dobavljac
        WHERE id_proizvod = ${idProduct} AND id_dobavljac = ${idSupplier}`;
    try {
        await query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbNewDelivery = async (delivery, idProduct) => {
    const sql = `INSERT INTO "TESTNI_SALON".proizvod_dobavljac VALUES (
        ${idProduct}, ${delivery.supplier.id}, ${delivery.buyingPrice}, ${delivery.avgDaysToDeliver}
    )`;
    try {
        const result = await query(sql, []);
        return true
    } catch (err) {
        console.log(err);
        throw err
    }
}