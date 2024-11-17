import express from "express"
import userController from '../controller/userController';
let router = express.Router();
let initWebRoutes = (app) =>{
   
    router.get('/api/get-allcode',userController.getAllCode);
    router.post('/api/add-new-user',userController.addNewUser);
    router.get('/api/get-all-user',userController.getAllUser);
    router.put('/api/put-save-user',userController.putSaveUser);
    router.delete('/api/delete-user',userController.deleteUser);
    router.get('/api/get-user-by-rfid',userController.getUserByRfid);
    router.get('/api/get-all-attendance-today',userController.getAllAttendanceToday)
    router.post('/api/create-attendance-and-history',userController.createTimeKeepingAndHistory);
    router.delete('/api/delete-attendance',userController.deleteAttendance);
    router.get('/api/get-all-history',userController.getAllHistory);
    router.get('/api/get-user-attendance-by-day',userController.getUserAttendanceByDay);
    router.get('/api/get-user-attendance-by-month',userController.getUserAttendanceByMonth);
    router.get('/api/get-attendance-by-id-and-month',userController.getAttendanceByIdAndMonth);
    return app.use("/",router);
}
module.exports = initWebRoutes;
