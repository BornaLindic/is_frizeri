import Calendar from "../models/Calendar.js";

export const getUserCalendar = async (req, res, next) => {
    let data = await Calendar.getDataForUser()


    res.status(200).json(data);
};

export const getAdminCalendar = async (req, res, next) => {
    let data = await Calendar.getDataForAdmin()

    res.status(200).json(data);
};