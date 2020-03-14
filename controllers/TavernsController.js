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