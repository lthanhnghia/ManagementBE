const { User ,Otp} = require('../Config/firebaseConfig');
const {sendEmail} = require('../Utils/SendEmail')
const getAllUser = async () => {
  const snapshot = await User.get(); // Chờ lấy dữ liệu
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
};

const addStudent = async ({ name, email, phone }) => {
  
  try {
    const newUserRef = await User.add({
      name,
      email,
      phone,
      username: null,       
      password: null,
      role:"Student"
    });

    return { success: true };
  } catch (error) {
    return { success: false };
}
}
const findPhone = async ({ phone }) => {
  try {
    const snapshot = await User.where("phone", "==", phone).limit(1).get();

    if (snapshot.empty) {
      return { status: 404, message: "Không tìm thấy user" };
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const otp = Math.floor(100000 + Math.random() * 900000);

    
    await sendEmail(
      userData.email,
      "Mã OTP",
      `OTP của số điện thoại ${phone} là: ${otp}`
    );

    
    await Otp.doc(phone).set({ code: otp, phone: phone,
  createdAt: Date.now(),                 
  expiresAt: Date.now() + 5 * 60 * 1000  });
    return { status: 200, message: "OTP đã được gửi vào email của bạn" };
  } catch (error) {
    return { status: 500, message: "Lỗi: " + error.message };
  }
};


module.exports = { getAllUser,addStudent,findPhone }