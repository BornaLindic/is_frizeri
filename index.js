import express from "express"
import cookieParser from "cookie-parser"

import homeRouter from "./routes/home.js"
import authRouter from "./routes/auth.js"
import scheduleRouter from "./routes/schedule.js"
import calendarRouter from "./routes/calendar.js"
import reservationRouter from "./routes/reservations.js"

const app = express();
app.set('view engine', 'pug')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/schedule", scheduleRouter);
app.use("/calendar", calendarRouter);
app.use("/reservation", reservationRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    res.render("error.pug", {
        error: {
            status: errorStatus,
            msg: errorMessage
        }
    })
});

app.listen(8800, async ()=> {
    console.log("Server started on 8800...");
})