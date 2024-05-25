import fetch from "node-fetch";
import jsdom from "jsdom";
import test from "unit.js"

const addProductCategories = await fetch("http://localhost:8800/products/addProduct")
  .then(response => response.text())
  .then(text => {
    const dom = new jsdom.JSDOM(text);
    return dom.window.document.querySelector("select").textContent
  })


const addProductForm = await fetch("http://localhost:8800/products/addProduct")
.then(response => response.text())
.then(text => {
  const dom = new jsdom.JSDOM(text);
  return dom.window.document.getElementById("productForm").textContent
})

// **Dodavanje novog proizvoda**
//Ispravne kategorije: njega, styling i oprema
test.string(addProductCategories).match('NjegaStylingOprema');

//Ispravna forma
test.string(addProductForm).match('Dodavanje proizvodaIspunite podatke o novom'+
   ' proizvoduKategorija proizvoda: NjegaStylingOpremaIme proizvoda: Opis proizvoda: Cijena proizvoda: Dodaj');

