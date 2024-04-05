import { query } from '../db/dbPool.js'

export default class Reservation {

    constructor(email, tel, date, idSpot) {
        this.id = undefined
        this.email = email
        this.tel = tel
        this.date = date
        this.idSpot = idSpot
    }


    //dohvat rezervacija na osnovu email adrese
    static async fetchByEmail(email) {

        let results = await dbGetReservationByEmail(email)
        let reservations = []

        if( results.length > 0 ) {
            for(let row in results) {
                let newReservation = new Reservation(row.email,
                                                     row.tel,
                                                     row.datum,
                                                     row.id_termin)
                newReservation.id = results[0].ID
                reservations.push(newReservation)
            }
        }
        return reservations
    }

    //dohvat slobodnih termina za datum
    static async fetchFreeSpotsForDate(date) {
        return await dbGetFreeSpotsForDate(date)
    }

    //je li rezervacija pohranjena u bazu podataka?
    isPersisted() {
        return this.id !== undefined
    }

    //pohrana rezervacije u bazu podataka
    async persist() {
        try {
            let reservationID = await dbNewReservation(this)
            this.id = reservationID
        } catch(err) {
            console.log("ERROR persisting reservation data: " + JSON.stringify(this))
            throw err
        }
    }

}


const dbGetFreeSpotsForDate = async (date) => {
    const sql = `select "ID", vrijeme
    from "TESTNI_SALON".termin
    where vrijeme not in (
    select vrijeme
    from "TESTNI_SALON".rezervacija JOIN "TESTNI_SALON".termin
    ON "TESTNI_SALON".rezervacija.id_termin = "TESTNI_SALON".termin."ID"
    where datum = '${date}'
    );`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting free spots for date: " + err);
        throw err
    }
};

const dbGetReservationByEmail = async (email) => {
    const sql = `SELECT "ID", email, tel, datum, id_termin 
    FROM "TESTNI_SALON".REZERVACIJA WHERE email = '` + email + `'`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting reservations by email: " + err);
        throw err
    }
};

const dbNewReservation = async (reservation) => {
    const sql = `INSERT INTO "TESTNI_SALON".REZERVACIJA VALUES (
        default, '${reservation.email}', '${reservation.tel}', '${reservation.date}', '${reservation.idSpot}'
    ) RETURNING "ID"`;
    try {
        const result = await query(sql, []);
        return result.rows[0].ID;
    } catch (err) {
        console.log(err);
        throw err
    }
}
