
import userService from '../services/userService';


let createUser =async (req,res) =>{
    try{
        let infor = await userService.createUser(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}

let getAllCode =async (req,res) =>{
    try{
        let infor = await userService.getAllCode(req.query.type);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let addNewUser =async (req,res) =>{
    try{
        let infor = await userService.addNewUser(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let getAllUser =async (req,res) =>{
    try{
        let infor = await userService.getAllUser();
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let putSaveUser =async (req,res) =>{
    try{
        let infor = await userService.putSaveUser(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let deleteUser =async (req,res) =>{
    try{
        let infor = await userService.deleteUser(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let getUserByRfid =async (req,res) =>{
    try{
        let infor = await userService.getUserByRfid(req.query.rfid);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let getAllAttendanceToday=async (req,res) =>{
    try{
        let infor = await userService.getAllAttendanceToday();
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let createTimeKeepingAndHistory=async (req,res) =>{
    try{
        let infor = await userService.createTimeKeepingAndHistory(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let deleteAttendance=async (req,res) =>{
    try{
        let infor = await userService.createTimeKeepingAndHistory(req.body);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let getAllHistory=async (req,res) =>{
    try{
        let infor = await userService.getAllHistory(req.query);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
let getUserAttendanceByDay=async (req,res) =>{
    try{
        let infor = await userService.getUserAttendanceByDay(req.query);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}

let getUserAttendanceByMonth=async (req,res) =>{
    try{
        let infor = await userService.getUserAttendanceByMonth(req.query);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}

let getAttendanceByIdAndMonth=async (req,res) =>{
    try{
        let infor = await userService.getAttendanceByIdAndMonth(req.query);
        return res.status(200).json(infor)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
           message: 'Error from server...'
       })
    }
        
}
module.exports={
    createUser:createUser,
    getAllCode:getAllCode,
    addNewUser:addNewUser,
    getAllUser:getAllUser,
    putSaveUser:putSaveUser,
    deleteUser:deleteUser,
    getUserByRfid:getUserByRfid,
    getAllAttendanceToday:getAllAttendanceToday,
    createTimeKeepingAndHistory:createTimeKeepingAndHistory,
    deleteAttendance:deleteAttendance,
    getAllHistory:getAllHistory,
    getUserAttendanceByDay:getUserAttendanceByDay,
    getUserAttendanceByMonth:getUserAttendanceByMonth,
    getAttendanceByIdAndMonth:getAttendanceByIdAndMonth
}