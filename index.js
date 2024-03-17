import express from "express"
import dotevn from "dotenv"

import homeRouter from "./routes/home.js"
import scheduleRouter from "./routes/schedule.js"
import calendarRouter from "./routes/calendar.js"

const app = express();
dotevn.config();

//middlewares
app.use(express.json());
app.use(express.static("./public"));

app.use("/", homeRouter);
app.use("/schedule", scheduleRouter);
app.use("/calendar", calendarRouter);

app.listen(8800, async ()=> {
    console.log("Server started.")
})