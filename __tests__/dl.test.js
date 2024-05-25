import test from "unit.js"

import { query } from '../db/dbPool.js'


let categories = undefined;
try {
  let result = await query('SELECT * FROM "TESTNI_SALON".KATEGORIJA', []);
  categories = result.rows;
} catch (err) {
  console.log(err);
  throw err
}


// **Dohvat kategorija**
//Ispravni atributi
test.object(categories[0]).hasProperty("ID");
test.object(categories[0]).hasProperty("ime_kategorije");

//Ispravne vrijednosti
test.string(categories[0].ime_kategorije).match('Njega');
test.string(categories[1].ime_kategorije).match('Styling');
test.string(categories[2].ime_kategorije).match('Oprema');

