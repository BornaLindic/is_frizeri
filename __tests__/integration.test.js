import fetch from "node-fetch";
import jsdom from "jsdom";
import test from "unit.js"

let idSupplier = undefined;
const addSupplier = await fetch("http://localhost:8800/suppliers", {
                                  method: "POST",
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    ime: "TESTKO",
                                    email: "test.test@gmail.com"
                                  })
                              })
  .then(response => response.text())
  .then(text => {
    const dom = new jsdom.JSDOM(text);
    idSupplier = dom.window.document.getElementById("TESTKO").children[2].href.split("=")[1]
    return dom.window.document.getElementById("TESTKO").children[0].textContent
  })

await fetch("http://localhost:8800/suppliers?id="+idSupplier, {method: 'DELETE'})

// **Kreiranje novog dostavljaca**
//Ispravno prikazivanje imena: TESTKO
test.string(addSupplier).match('TESTKO');