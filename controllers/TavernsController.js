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

    let tavern;

    res.setHeader('Content-Type', 'application/json');

    const pool = await poolPromise;

    try {
        tavern = await pool
            .request()
            .input('UserId', sql.Int, req.user.ID)
            .query(
                // eslint-disable-next-line quotes
                `SELECT TOP (1) TavernName, UserName, TavernId FROM Taverns JOIN Users on Users.TavernID = Taverns.ID WHERE Users.ID = @UserId`
            );
        tavern = tavern.recordset.shift();
        console.log(req.user)
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(tavern);
};

module.exports.getCurrent = getCurrent;