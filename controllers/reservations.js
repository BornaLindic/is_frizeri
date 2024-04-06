import Reservation from "../models/Reservation.js";
import User from "../models/User.js"

export const getFreeSpotsForDate = async (req, res, next) => {
    try {
        let date = `${req.query.year}-${req.query.month}-${req.query.day}`;
        let freeSlots = await Reservation.fetchFreeSpotsForDate(date);

        res.render("../views/makeReservation.pug", {
            freeSlots: freeSlots,
            date: {
                year: req.query.year,
                month: req.query.month,
                day: req.query.day
            }
        });
    } catch(err) {
        next(err)
    }
};

export const makeReservation = async (req, res, next) => {
    try {
        let user = await User.fetchByUserId(req.user.id);
        if (!user) return next(createError(404, "User not found!"));

        let active = await Reservation.fetchByEmail(user.email)
        if (active.length >= 2) {
            res.render("../views/successfullReservation", {success: false})
            return
        }

        let newReservation = new Reservation(
            user.email,
            req.body.tel,
            `${req.body.year}-${req.body.month}-${req.body.day}`,
            req.body.time
        );

        await newReservation.persist();
        res.render("../views/successfullReservation", {success: true})
        
    } catch(err) {
        next(err)
    }
};