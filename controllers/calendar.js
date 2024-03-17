export const getUserCalendar = async (req, res, next) => {
    res.status(200).json([
        { eventName: 'Nema slobodnih termina', calendar: 'user', color: 'red', day:24, month:3 },
        { eventName: 'Slobodnih termina: 3', calendar: 'user', color: 'green', day:25, month:3 },
        { eventName: 'Slobodnih termina: 1', calendar: 'user', color: 'green', day:26, month:3 },
        { eventName: 'Slobodnih termina: 3', calendar: 'user', color: 'green', day:27, month:3 },
        { eventName: 'Slobodnih termina: 4', calendar: 'user', color: 'green', day:28, month:3 },
        { eventName: 'Nema slobodnih termina', calendar: 'user', color: 'red', day:29, month:3 },
        { eventName: 'Nema slobodnih termina', calendar: 'user', color: 'red', day:30, month:3 }
    ]);
};

export const getAdminCalendar = async (req, res, next) => {
    res.status(200).json([
        { eventName: '[09-10] Marko Marulić, 0998128324', calendar: 'admin', color: 'orange', day:3, month:3 },
        { eventName: '[11-12] Ivan Ivanic, 0998128324', calendar: 'admin', color: 'orange', day:3, month:3 },
        { eventName: '[12-13] Misko Maskic, 0998128324', calendar: 'admin', color: 'orange', day:3, month:3 },
        { eventName: '[15-16] Juraj Jura, 0998128324', calendar: 'admin', color: 'orange', day:3, month:3 },
        { eventName: '[16-17] Igor Igi, 0998128324', calendar: 'admin', color: 'orange', day:3, month:3 },
        { eventName: '[11-12] Ivan Ajak, 0998128324', calendar: 'admin', color: 'orange', day:4, month:3 },
        { eventName: '[11-12] Luka Lukic, 0998128324', calendar: 'admin', color: 'orange', day:5, month:3 },
        { eventName: '[11-12] Bobo Bobic, 0998128324', calendar: 'admin', color: 'orange', day:6, month:3 },
        { eventName: '[12-13] Joza Jozic, 0998128324', calendar: 'admin', color: 'orange', day:6, month:3 },
        { eventName: '[11-12] Stef Stefic, 0998128324', calendar: 'admin', color: 'orange', day:7, month:3 }
    ]);
};