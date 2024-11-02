import nodemailer from 'nodemailer';
require('dotenv').config();
let sendSimpleEmail=async(dataSend)=>{
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL_APP,
            pass:process.env.EMAIL_APP_PASSWORD
        }
    });
    let info  = await transporter.sendMail({
        from:`"Thanh Do" <dotienthanh28062002@gmail.com>`,
        to: dataSend.email,
        subject:"Thông tin chấm công",
        html:getBodyHTMLEmail(dataSend)
    });
}

let getBodyHTMLEmail=(dataSend)=>{
    let result =`
            <h3>chào ${dataSend.fullName}! </h3>
            <p>Chúng tôi thông báo rằng: Hôm này bạn đã chấm công thành công</p>
            <div>Thank you!</div>
            `       
    return result;
}
module.exports={
    sendSimpleEmail:sendSimpleEmail,
}