import { query } from '../db/dbPool.js'

export default class Supplier {

    constructor(ime, email) {
        this.id = undefined
        this.ime = ime
        this.email = email
    }


    //dohvat dobavljaca na osnovu id-a
    static async fetchBySupplierId(id) {

        let results = await dbGetSupplierById(id)
        let newSupplier = new Supplier()

        if( results.length > 0 ) {
            newSupplier = new Supplier(results[0].ime,
                                     results[0].email)
            newSupplier.id = results[0].ID
        }
        return newSupplier
    }

    //dohvat svih dobavljaca
    static async fetchAll() {

        let results = await dbGetAllSuppliers()
        let suppliers = []

        for( let row of results ) {
            let newSupplier = new Supplier(row.ime,
                                         row.email)
            newSupplier.id = row.ID
            suppliers.push(newSupplier)
        }
        return suppliers
    }

    // azuriranje dobavljaca
    static async updateSupplier(newSupplier) {
        await dbUpdateSupplier(newSupplier)
    }

    // brisanje dobavljaca
    static async deleteSupplier(id) {
        await dbDeleteSupplier(id)
    }

    //je li dobavljac pohranjen u bazu podataka?
    isPersisted() {
        return this.id !== undefined
    }

    //pohrana dobavljaca u bazu podataka
    async persist() {
        try {
            let supplierID = await dbNewSupplier(this)
            this.id = supplierID
        } catch(err) {
            console.log("ERROR persisting supplier data: " + JSON.stringify(this))
            throw err
        }
    }

}


const dbGetSupplierById = async (id) => {
    const sql = `SELECT "ID", IME, EMAIL
    FROM "TESTNI_SALON".DOBAVLJAC WHERE "ID" = ${id}`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting supplier by id: " + err);
        throw err
    }
};

const dbGetAllSuppliers = async () => {
    const sql = `SELECT "ID", IME, EMAIL
    FROM "TESTNI_SALON".DOBAVLJAC`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting all suppliers " + err);
        throw err
    }
};

const dbNewSupplier = async (supplier) => {
    const sql = `INSERT INTO "TESTNI_SALON".DOBAVLJAC VALUES (
        default, '${supplier.email}', '${supplier.ime}'
    ) RETURNING "ID"`;
    try {
        const result = await query(sql, []);
        return result.rows[0].ID;
    } catch (err) {
        console.log(err);
        throw err
    }
}

const dbUpdateSupplier = async (newSupplier) => {
    const sql = `UPDATE "TESTNI_SALON".DOBAVLJAC SET
        IME = '${newSupplier.ime}',
        EMAIL = '${newSupplier.email}'
        WHERE "ID" = ${newSupplier.id};`;
    try {
        await query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbDeleteSupplier = async (id) => {
    const sql = `DELETE  FROM "TESTNI_SALON".DOBAVLJAC CASCADE
        WHERE "ID" = ${id} `;
    try {
        await query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}