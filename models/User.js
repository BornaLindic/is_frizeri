import { query } from '../db/dbPool.js'

//razred User enkapsulira korisnika web trgovine
export default class User {

    //konstruktor korisnika
    constructor(first_name, last_name, email, password, role=0) {
        this.id = undefined
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.password = password
        this.role = role
    }


    //dohvat korisnika na osnovu email adrese
    static async fetchByEmail(email) {

        let results = await dbGetUserByEmail(email)
        let newUser = undefined

        if( results.length > 0 ) {
            newUser = new User( results[0].ime,
                                results[0].prezime,
                                results[0].email,
                                results[0].lozinka,
                                results[0].uloga)
            newUser.id = results[0].ID
        }
        return newUser
    }

    //dohvat korisnika na osnovu id korisnika
    static async fetchByUserId(id) {

        let results = await dbGetUserById(id)
        let newUser = new User()

        if( results.length > 0 ) {
            newUser = new User( results[0].ime,
                                results[0].prezime,
                                results[0].email,
                                results[0].lozinka,
                                results[0].uloga)
            newUser.id = results[0].id
        }
        return newUser
    }

    //je li korisnik pohranjen u bazu podataka?
    isPersisted() {
        return this.id !== undefined
    }

    //pohrana korisnika u bazu podataka
    async persist() {
        try {
            let userID = await dbNewUser(this)
            this.id = userID
        } catch(err) {
            console.log("ERROR persisting user data: " + JSON.stringify(this))
            throw err
        }
    }

}


//dohvat korisnika iz baze podataka na osnovu email adrese
const dbGetUserByEmail = async (user_email) => {
    const sql = `SELECT "ID", ime, prezime, email, lozinka, uloga 
    FROM "TESTNI_SALON".KORISNIK WHERE email = '` + user_email + `'`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting user by email: " + err);
        throw err
    }
};

//dohvat korisnika iz baze podataka na osnovu id korisnika (stupac id)
const dbGetUserById = async (user_id) => {
    const sql = `SELECT "ID", ime, prezime, email, lozinka, uloga
    FROM "TESTNI_SALON".KORISNIK WHERE "ID" = ` + user_id;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

//umetanje zapisa o korisniku u bazu podataka
const dbNewUser = async (user) => {
    const sql = `INSERT INTO "TESTNI_SALON".KORISNIK VALUES (
        default, '${user.email}', '${user.password}', '${user.first_name}', '${user.last_name}', ${user.role}
    ) RETURNING "ID"`;
    try {
        const result = await query(sql, []);
        return result.rows[0].id;
    } catch (err) {
        console.log(err);
        throw err
    }
}
