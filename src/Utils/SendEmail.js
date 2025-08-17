const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  
  let transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: "hotelstart05@gmail.com", 
      pass: "yvbs ucbs sfvl wrzc"  
    }
  });

 
  let info = await transporter.sendMail({
    to,          
    subject,     
    text         
  });

  console.log("Email sent: %s", info.messageId);
  return info;
}

module.exports = { sendEmail };
