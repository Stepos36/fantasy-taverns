const sql = require('mssql');
const { poolPromise } = require('../data/db');

const createRoom = async function(req, res) {
    const pool = await poolPromise;
    let roomResult;
    let room = req.body;
    let roomPool;
    const RoomId = parseInt(room.RoomID);
    if (!room.RoomName) {
        return returnError(res, 'Please enter a Name', 422)
    }
    else if (RoomId === 0) {
        try {
            roomPool = await pool
                .request()
                .input('RoomName', sql.VarChar, room.RoomName)
                .input('TavernID', sql.Int, room.TavernID)
                .input('Availability', sql.Bit, room.Availability)
                .input('DailyRate', sql.Money, room.DailyRate)
                .query(
                    'INSERT INTO Rooms ([RoomName], [TavernID], [RoomStatus], [DailyRate]) OUTPUT inserted.* values (@RoomName, @TavernID, @Availability, @DailyRate)',
                );
                roomResult = roomPool.recordset.shift()
        } catch (e) {
            throwError(e.message);
        }
    }
    return returnSuccessResponse(res, roomResult, 201);
};

module.exports.createRoom = createRoom;

const deleteRoom = async function(req, res) {
    const pool = await poolPromise;
    let roomPool;
    const RoomId = parseInt(req.query.roomID);
    try {
            roomPool = await pool
                .request()
                .input('RoomID', sql.Int, RoomId)
                .query(
                    'DELETE from Rooms WHERE ID = @RoomID',
                );
                roomResult = roomPool.recordset
        } catch (e) {
            throwError(e.message);
    }
    return returnSuccessResponse(res, roomResult, 200);
};

module.exports.deleteRoom = deleteRoom;

const updateRoom = async function(req, res) {
    const pool = await poolPromise;
    let roomResult;
    let room = req.body;
    let roomPool;
    const RoomId = parseInt(room.RoomID);
    if (!room.RoomName) {
        return returnError(res, 'Please enter a Name', 422)
    }
    else {
        try {
            roomPool = await pool
                .request()
                .input('RoomID', sql.Int, RoomId)
                .input('RoomName', sql.VarChar, room.RoomName)
                .input('Availability', sql.Bit, room.Availability)
                .input('DailyRate', sql.Money, room.DailyRate)
                .query(
                    'UPDATE Rooms SET [RoomName] = @RoomName, [RoomStatus] = @Availability, [DailyRate] = @DailyRate OUTPUT inserted.* WHERE [ID] = @RoomID',
                );
                roomResult = roomPool.recordset
        } catch (e) {
            throwError(e.message);
        }
    }
    console.log(roomResult)
    return returnSuccessResponse(res, roomResult, 201);
};

module.exports.updateRoom = updateRoom;
