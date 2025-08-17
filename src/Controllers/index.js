
const { getAllUser, addStudent, findPhone } = require('../Services/UserService')
const {confirmOtp} = require('../Services/OtpService')
const getAll = async (request, response) => {
  try {
    const user = await getAllUser();
    response.status(200).json(user);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
}

const createStudent = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await addStudent({ name, email, phone });

    res.status(201).json({ message: "Thêm học viên thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi: " + err.message });
  }
};
const findPhoneOTP = async (req, res) => {
  try {
    const { phone } = req.params;
    const result = await findPhone({ phone });

    
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Lỗi: " + err.message });
  }
};
const confirmOtps = async (req, res) => {
  try {
    const { phone, otp } = req.params;
       
    const result = await confirmOtp({ phone,otp });
     
    
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Lỗi: " + err.message });
  }
};
module.exports = { getAll, createStudent,findPhoneOTP ,confirmOtps}