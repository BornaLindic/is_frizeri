import { query } from '../db/dbPool.js'

export default class Product {

    constructor(idKategorija, ime, opis, cijena, slika = undefined) {
        this.id = undefined
        this.idKategorija = idKategorija
        this.ime = ime
        this.opis = opis
        this.cijena = cijena
        this.slika = slika
    }


    //dohvat proizvoda na osnovu id-a
    static async fetchByProductId(id) {

        let results = await dbGetProductById(id)
        let newProduct = new Product()

        if( results.length > 0 ) {
            newProduct = new Product(results[0].idKategorija,
                                     results[0].ime,
                                     results[0].opis,
                                     results[0].cijena,
                                     results[0].slika)
            newProduct.id = results[0].ID
        }
        return newProduct
    }

    //dohvat svih proizvoda
    static async fetchAll() {

        let results = await dbGetAllProducts()
        let products = []

        for( let row of results ) {
            let newProduct = new Product(row.id_kategorija,
                                         row.ime,
                                         row.opis,
                                         row.cijena,
                                         row.slika)
            newProduct.id = row.ID
            products.push(newProduct)
        }
        return products
    }

    // azuriranje proizvoda
    static async updateProduct(newProduct) {
        await dbUpdateProduct(newProduct)
    }

    // brisanje proizvoda
    static async deleteProduct(id) {
        await dbDeleteProduct(id)
    }

    //je li proizvod pohranjen u bazu podataka?
    isPersisted() {
        return this.id !== undefined
    }

    //pohrana proizvoda u bazu podataka
    async persist() {
        try {
            let productID = await dbNewProduct(this)
            this.id = productID
        } catch(err) {
            console.log("ERROR persisting product data: " + JSON.stringify(this))
            throw err
        }
    }

}



const dbGetProductById = async (id) => {
    const sql = `SELECT "ID", ID_KATEGORIJA, IME, OPIS, CIJENA, SLIKA
    FROM "TESTNI_SALON".PROIZVOD WHERE "ID" = ${id}`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting product by id: " + err);
        throw err
    }
};

const dbGetAllProducts = async () => {
    const sql = `SELECT "ID", ID_KATEGORIJA, IME, OPIS, CIJENA, SLIKA
    FROM "TESTNI_SALON".PROIZVOD`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting all products " + err);
        throw err
    }
};

const dbNewProduct = async (product) => {
    const sql = `INSERT INTO "TESTNI_SALON".PROIZVOD VALUES (
        default, ${product.idKategorija}, '${product.ime}', '${product.opis}', ${product.cijena}, '${product.slika}' 
    ) RETURNING "ID"`;
    try {
        const result = await query(sql, []);
        return result.rows[0].ID;
    } catch (err) {
        console.log(err);
        throw err
    }
}

const dbUpdateProduct = async (newProduct) => {
    const sql = `UPDATE "TESTNI_SALON".PROIZVOD SET
        ID_KATEGORIJA = ${newProduct.idKategorija},
        IME = '${newProduct.ime}',
        OPIS = '${newProduct.opis}',
        CIJENA = ${newProduct.cijena},
        SLIKA = '${newProduct.slika}'
        WHERE "ID" = ${newProduct.id}`;
    try {
        await query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbDeleteProduct = async (id) => {
    const sql = `DELETE FROM "TESTNI_SALON".PROIZVOD
        WHERE "ID" = ${id}`;
    try {
        await query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}