import { query } from '../db/dbPool.js'

export default class Calendar {


    //dohvat podataka za crtanje kalendara iz perspektive korisnika
    static async getDataForUser() {
        return await dbGetDataForUser()
    }

    //dohvat podataka za crtanje kalendara iz perspektive admin
    static async getDataForAdmin() {
        return await dbGetDataForAdmin()
    }


}


const dbGetDataForUser = async () => {
    const sql = `
    with brojSlobTermPoDanu as (
        select
            -- broj ukupno dostupnih termina - broj rezervacija
            (select count(*) from "TESTNI_SALON".termin) - count(*)  slobodnihTermina,
            dan
        from
            "TESTNI_SALON".datum d JOIN
            "TESTNI_SALON".rezervacija r ON d.dan = r.datum
        group by
            dan
    )
    
    select
        case
            when slobodnihTermina = 0 OR not radni_dan then
                'Nema slobodnih termina'
            when slobodnihTermina is null then
                'Slobodnih termina: ' || (select count(*) from "TESTNI_SALON".termin)
            else 'Slobodnih termina: ' || slobodnihTermina
        end "eventName",
        'user' calendar,
        case
            when slobodnihTermina = 0 OR not radni_dan then 'red'
            else 'green'
        end color,
        extract(day from d.dan)::int "day",
        extract(month from d.dan)::int "month",
        extract(year from d.dan)::int "year"
    from
        "TESTNI_SALON".datum d LEFT JOIN
        brojSlobTermPoDanu bsrpd ON d.dan = bsrpd.dan
    `;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting data for user calendar: " + err);
        throw err
    }
};

const dbGetDataForAdmin = async () => {
    const sql = `
    select
        '[' || to_char(vrijeme_pocetak, 'HH24:MM') || ' - ' || to_char(vrijeme_kraj, 'HH24:MM') || '] ' ||
            ime || ' ' || prezime || ', ' || tel as "eventName",
        'admin' calendar,
        'orange' color,
        extract(day from datum)::int "day",
        extract(month from datum)::int "month",
        extract(year from datum)::int "year"
    from
        "TESTNI_SALON".rezervacija r JOIN
        "TESTNI_SALON".termin t ON r.id_termin = t."ID" JOIN
        "TESTNI_SALON".korisnik k ON r.email = k.email;
	`;
    try {
        const result = await query(sql, []);
        return result.rows;
    } catch (err) {
        console.log("Error while getting data for admin calendar: " + err);
        throw err
    }
};