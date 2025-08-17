const { User ,Otp} = require('../Config/firebaseConfig');
const {sendEmail} = require('../Utils/SendEmail')

const confirmOtp = async ({phone,otp}) =>{
    const codeOtp = await Otp.doc(phone).get();
    if (!codeOtp.exists) {
    return { status: 404, message: "Không tìm thấy OTP cho số này" };
  }
    const otpData = codeOtp.data();
        
    const error = await  errorConfirmOtp({codeOtp,otpData,phone, otp})
    
    if (error) {
      return error;
    }
    try {
   const snapshot = await User.where("phone", "==", phone).limit(1).get();
   const userData = snapshot.docs[0].data();
      await Otp.doc(phone).delete();
    
     return { status: 200, message: "Xác thực thành công" ,role:`${userData.role}`};  
    } catch (error) {
        return { status: 500, message: "Lỗi: "+error.message };  
    }
     
}

const errorConfirmOtp = async  ({codeOtp,otpData,phone, otp}) =>{
     

    if (Date.now() > otpData.expiresAt) {
      await  Otp.doc(phone).delete();
      return { status: 400, message: "OTP đã hết hạn" };
    }
        
    if (Number(otpData.code) !== Number(otp)) {
      return { status: 400, message: "OTP không đúng" };
    }
    return null;
}
module.exports = { confirmOtp}