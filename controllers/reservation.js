import Reservation from "../models/Reservations.js";

export const getFreeSpotsForDate = async (req, res, next) => {
    try {
        let date = `${req.query.year}-${req.query.month}-${req.query.day}`;
        let freeSlots = await Reservation.fetchFreeSpotsForDate(date);

        res.status(200).json(freeSlots)
    } catch(err) {
        next(err)
    }
};

export const makeReservation = async (req, res, next) => {
    try {
        let newReservation = new Reservation(
            req.body.email,
            req.body.tel,
            `${req.body.year}-${req.body.month}-${req.body.day}`,
            req.body.idSpot
        );

        await newReservation.persist();
        res.status(200).send("Reservation made successfully!");
        
    } catch(err) {
        next(err)
    }
};