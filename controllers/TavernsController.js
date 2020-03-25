const sql = require('mssql');
const { poolPromise } = require('../data/db');

getAll = async function(req, res) {
    // format request

    let taverns;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        taverns = await pool
            .request()
            .query(
                // eslint-disable-next-line quotes
                `select * from Taverns`,
            );
        taverns = taverns.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(taverns);
};

module.exports.getAll = getAll;

getCurrent = async function(req, res) {
    // format request

    let rooms;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        rooms = await pool
            .request()
            .input('UserId', sql.Int, req.user.ID)
            .input('Name', sql.VarChar, req.query.Search)
            .query(
                // eslint-disable-next-line quotes
                `SELECT Rooms.ID as RoomID, RoomName, RoomStatus, DailyRate, TavernName, UserName, Rooms.TavernID FROM Rooms JOIN Taverns on TavernID = Taverns.ID JOIN Users on Users.TavernID = Taverns.ID WHERE Users.ID = @UserId and RoomName Like '%'+ @Name +'%' `
            );
        rooms = rooms.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(rooms);

};

module.exports.getCurrent = getCurrent;
