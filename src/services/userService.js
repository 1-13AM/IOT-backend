import { where } from 'sequelize';
import db from '../models/index';
import { Sequelize, Op, fn, col } from 'sequelize';
import moment from 'moment';
import emailService from '../services/emailService';
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            } else resolve(false);
        } catch (e) {
            reject(e);
        }
    })
}
let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Your's email is already been userd,Plz try another email!",
                })
            } else {
                await db.User.create({
                    email: data.email,
                    password: data.password,
                    fullName: data.fullName,
                    address: data.address,
                    phonenumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllCode = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput) {
                resolve({
                    errCode: 1,
                    errMessage: "pamameter",
                })
            } else {
                let data
                data = await db.Allcode.findAll({
                    where: { type: dataInput },
                    attributes: ['keyMap', 'valueV'],
                })
                if (!data) data = []
                resolve({
                    errCode: 0,
                    data: data
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}
let addNewUser = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.rfid || !dataInput.fullName || !dataInput.email || !dataInput.phoneNumber || !dataInput.address || !dataInput.gender || !dataInput.position) {
                resolve({
                    errCode: 1,
                    errMessage: "pamameter",
                })
            } else {
                let user = await db.User.findOne({
                    where: { rfid: dataInput.rfid }
                })
                if (user) {
                    resolve({
                        errCode: 2,
                        errMessage: 'RFID đã tồn tại'
                    });
                } else {
                    await db.User.create({
                        rfid: dataInput.rfid,
                        fullName: dataInput.fullName,
                        email: dataInput.email,
                        phonenumber: dataInput.phoneNumber,
                        address: dataInput.address,
                        gender: dataInput.gender,
                        roleId: dataInput.position
                    });

                }
                resolve({
                    errCode: 0,
                    errMessage: 'Thêm user thành công'
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                include: [
                    { model: db.Allcode, as: 'genderData', attributes: ['valueV'] },
                    { model: db.Allcode, as: 'positionData', attributes: ['valueV'] },
                ],
                raw: true
            })
            if (!users) users = []
            resolve({
                errCode: 0,
                data: users
            });


        } catch (e) {
            reject(e);
        }
    })
}
let putSaveUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.rfid || !data.fullName || !data.email || !data.phoneNumber || !data.gender || !data.position || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'parameter'
                })
            }
            else {
                let user = await db.User.findOne({
                    where: { rfid: data.rfid },
                    raw: false
                })
                if (user) {
                    user.fullName = data.fullName,
                        user.email = data.email,
                        user.phonenumber = data.phoneNumber,
                        user.address = data.address,
                        user.gender = data.gender,
                        user.roleId = data.position
                }
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'parameter'
                })
            }
            else {
                let user = await db.User.findOne({
                    where: { id: data.id }
                })
                if (!user) {
                    resolve({
                        errCode: 2,
                        errMessage: "The user isn't exist"
                    })
                }
                else {
                    await db.User.destroy({
                        where: { id: data.id }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'The user deleted!'
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}
let getUserByRfid = (rfid) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!rfid) {
                resolve({
                    errCode: 1,
                    errMessage: 'parameter'
                })
            }
            else {
                let user = await db.User.findOne({
                    where: { rfid: rfid }
                })
                if (!user) user = []
                resolve({
                    errCode: 0,
                    data: user
                });


            }


        } catch (e) {
            reject(e);
        }
    })
}

let createTimeKeepingAndHistory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.timestamp) {
                return resolve({
                    errCode: 1,
                    errMessage: 'parameter'
                });
            } else {
                let time = data.timestamp
                let startOfDay = moment().tz('Asia/Ho_Chi_Minh').startOf('day').valueOf()
                let endOfDay = moment().tz('Asia/Ho_Chi_Minh').endOf('day').valueOf()

                let eightAM = moment().tz('Asia/Ho_Chi_Minh').startOf('day').set({ hour: 8, minute: 0, second: 0, millisecond: 0 }).valueOf();

                await db.History.create({
                    idUser: data.id,
                    timecheck: time
                });

                let attendance = await db.Attendance.findOne({
                    where: {
                        idUser: data.id,
                        timecheck: {
                            [Op.between]: [startOfDay, endOfDay] // Lọc theo thời gian trong ngày
                        }
                    }
                });
                if (attendance) {
                    return resolve({
                        errCode: 2,
                        errMessage: 'Đã chấm công trước đó'
                    });
                } else {

                    let status = time > eightAM ? 'M' : 'D';

                    await db.Attendance.create({
                        idUser: data.id,
                        timecheck: time,
                        status: status,
                        note: data.note
                    });
                    let user = await db.User.findOne({
                        where: { id: data.id }
                    })
                    await emailService.sendSimpleEmail({
                        fullName: user.fullName,
                        email: user.email
                    })

                    return resolve({
                        errCode: 0,
                        errMessage: 'Chấm công thành công'
                    });
                }

            }
        } catch (e) {
            reject(e);
        }
    });
};


let getAllAttendanceToday = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let startOfDay = moment().tz('Asia/Ho_Chi_Minh').startOf('day').valueOf()
            let endOfDay = moment().tz('Asia/Ho_Chi_Minh').endOf('day').valueOf()
            let listAttendance = await db.Attendance.findAll({
                where: {
                    timecheck: {
                        [Op.between]: [startOfDay, endOfDay] // Lọc theo thời gian trong ngày
                    }
                }
            })
            if (!listAttendance) listAttendance = []
            resolve({
                errCode: 0,
                data: listAttendance
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllHistory = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            // Kiểm tra các tham số cần thiết
            if (!data.userId || !data.timestamp) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters'
                });
            }

            else {
                // Chuyển đổi timestamp sang 00:00:00 và 23:59:59
                let startOfDay = data.timestamp // 00:00:00
                let x = Number(startOfDay); // Chuyển startOfDay thành số nguyên (Number)

                let endOfDay = x + 24 * 60 * 60 * 1000 - 1; // Cộng thêm 24 giờ (1 ngày) và trừ đi 1ms


                // Lấy dữ liệu từ database
                let historyData = await db.History.findAll({
                    where: {
                        idUser: data.userId,
                        timecheck: {
                            [Op.between]: [startOfDay, endOfDay]
                        }
                    }
                });

                // Nếu không có dữ liệu, khởi tạo là mảng rỗng
                if (!historyData) historyData = [];

                // Trả về kết quả
                resolve({
                    errCode: 0,
                    data: historyData
                });
            }
        } catch (e) {
            console.error('Error fetching history:', e); // Ghi log lỗi
            reject({
                errCode: 2,
                errMessage: 'Error fetching history'
            });
        }
    });
}
let getUserAttendanceByMonth = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.month) {
                return resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                });
            }
            let month = parseInt(data.month);
            let date = new Date(month);
            // Thời gian bắt đầu của tháng
            let startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime();

            // Thời gian kết thúc của tháng
            let endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

            let attendanceCounts = await db.User.findAll({
                attributes: [
                    'id',
                    'rfid',
                    'fullName',
                    [fn('COUNT', col('Attendances.id')), 'totalAttendance']
                ],
                include: [
                    {
                        model: db.Attendance,
                        required: false,
                        attributes: [],
                        where: {
                            timecheck: {
                                [Op.between]: [startOfMonth, endOfMonth]
                            }
                        }
                    },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueV'] },
                    { model: db.Allcode, as: 'positionData', attributes: ['valueV'] },
                ],
                raw: true,
                group: ['User.id'],
            });

            let lateAttendanceCounts = await db.User.findAll({
                attributes: [
                    'id',
                    [fn('COUNT', col('Attendances.id')), 'totalAttendance']
                ],
                include: [{
                    model: db.Attendance,
                    attributes: [],
                    where: {
                        status: 'M',
                        timecheck: {
                            [Op.between]: [startOfMonth, endOfMonth]
                        }
                    }
                }],
                raw: true,
                group: ['User.id'],
            });
            attendanceCounts = attendanceCounts.map(user => {
                const lateCount = lateAttendanceCounts.find(late => late.id === user.id);
                user.lateAttendance = lateCount ? lateCount.totalAttendance : 0;
                return user;
            });

            resolve({
                errCode: 0,
                data: attendanceCounts
            });
        } catch (e) {
            reject(e);
        }
    });
}

let getAttendanceByIdAndMonth = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('sdfs',data)
            if (!data.month||!data.id) {
                return resolve({
                    errCode: 1,
                    errMessage: 'missing parameter'
                });
            }
            let month = parseInt(data.month);
            let date = new Date(month);
            // Thời gian bắt đầu của tháng
            let startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime();

            // Thời gian kết thúc của tháng
            let endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

            let user = await db.User.findOne({
                where:{
                    id:data.id
                },
                attributes: [
                    'id',
                    'rfid',
                    'fullName',
                ],
                raw:true
            });
            let attendance = await db.Attendance.findAll({
                where:{
                    idUser:data.id,
                    timecheck: {
                        [Op.between]: [startOfMonth, endOfMonth]
                    }

                },
                attributes: [
                    'timecheck',
                    'status',
                ],
                raw:true
            });

            user.listAttendance=attendance

            

            resolve({
                errCode: 0,
                data: user
            });
        } catch (e) {
            reject(e);
        }
    });
}





module.exports = {
    createUser: createUser,
    getAllCode: getAllCode,
    addNewUser: addNewUser,
    getAllUser: getAllUser,
    putSaveUser: putSaveUser,
    deleteUser: deleteUser,
    getUserByRfid: getUserByRfid,
    createTimeKeepingAndHistory: createTimeKeepingAndHistory,
    getAllAttendanceToday: getAllAttendanceToday,
    getAllHistory: getAllHistory,
    getUserAttendanceByMonth: getUserAttendanceByMonth,
    getAttendanceByIdAndMonth:getAttendanceByIdAndMonth
}