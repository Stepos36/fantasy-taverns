const sql = require('mssql');
const { poolPromise } = require('../data/db');


const createRoom = async function(req, res) {
    const pool = await poolPromise;
    let roomResult;
    let room = req.body;
    let roomPool;
    const RoomId = parseInt(room.RoomID);
    console.log(room)
    if (!room.RoomName) {
        return returnError(res, 'Please enter a Name', 422)
    }
    else if (parseInt(RoomId) === 0) {
        try {
            console.log(room.DailyRate)
            roomPool = await pool
                .request()
                .input('RoomName', sql.VarChar, room.RoomName)
                .input('TavernID', sql.Int, room.TavernID)
                .input('Availability', sql.Int, room.Availability)
                .input('DailyRate', sql.Money, room.DailyRate)
                .query(
                    'INSERT INTO Rooms ([RoomName], [TavernID], [RoomStatus], [DailyRate]) OUTPUT inserted.* values (@RoomName, @TavernID, @Availability, @DailyRate)',
                );
                roomResult = roomPool.recordset.shift()
        } catch (e) {
            throwError(e.message);
        }
    }
    console.log(roomResult)
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
// create = async function(req, res) {
//     res.setHeader('ContentType', 'application/json');
//     const body = req.body;

//     if (!body.Password) {
//         return returnError(res, 'Please enter a password to register', 422);
//     }
//     let err, user;

//     [err, user] = await executeOrThrow(createUser(body));
//     if (err) {
//         return returnError(res, err, 422);
//     }

//     return returnSuccessResponse(res, user, 201);
// };

// module.exports.create = create;

// const comparePassword = async function(user, passedPassword) {
//     let err, pass;

//     if (!user.Password) {
//         throwError('password not set');
//     }

//     [err, pass] = await executeOrThrow(
//         bcryptPromise.compare(passedPassword, user.Password),
//     );
//     if (err) {
//         throwError(err);
//     }

//     if (!pass) {
//         throwError('invalid password');
//     }

//     return user;
// };

// const authUser = async function(userInfo) {
//     if (!userInfo.Password) {
//         throwError('Please enter a password to login');
//     }

//     let user;

//     const pool = await poolPromise;

//     try {
//         user = await pool
//             .request()
//             .input('UserName', sql.VarChar, userInfo.UserName)
//             .query('select * from Users where UserName = @UserName');
//         user = user.recordset.shift();
//     } catch (e) {
//         returnError(res, e, 500);
//     }

//     if (!user) {
//         throwError('Not registered');
//     }

//     [err, user] = await executeOrThrow(
//         comparePassword(user, userInfo.Password),
//     );

//     if (err) {
//         throwError(err.message);
//     }

//     return user;
// };

// module.exports.authUser = authUser;

// const getJwt = function(user) {
//     let expirationTime = parseInt(process.env.jwt_expiration);

//     return `Bearer ${jwt.sign(
//         // eslint-disable-next-line camelcase
//         { user_id: user.ID },
//         process.env.jwt_encryption,
//         {
//             expiresIn: expirationTime,
//         },
//     )}`;
// };

// const login = async function(req, res) {
//     let err, user;

//     [err, user] = await executeOrThrow(authUser(req.body));
//     if (err) {
//         return returnError(res, err, 422);
//     }
//     delete user.Password;
//     return returnSuccessResponse(res, {
//         token: getJwt(user),
//         user: JSON.stringify(user),
//     });
// };

// module.exports.login = login;
