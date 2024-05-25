import fetch from "node-fetch";
import test from "unit.js"

const calendar = await fetch("http://localhost:8800/calendar")
  .then(response => {return response.json()});


// **Dohvat kalendara**
//Ispravni atributi
test.object(calendar[0]).hasProperty("eventName");
test.object(calendar[0]).hasProperty("calendar");
test.object(calendar[0]).hasProperty("color");
test.object(calendar[0]).hasProperty("day");
test.object(calendar[0]).hasProperty("month");
test.object(calendar[0]).hasProperty("year");


