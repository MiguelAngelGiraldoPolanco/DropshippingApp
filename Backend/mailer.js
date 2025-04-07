const nodemailer = require("nodemailer");
const { config } = require('./config/config');

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: config.smtpUser, // generated ethereal user
    pass: config.smtpPassword, // generated ethereal password
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMain() {
  // Generate test SMTP service account from ethereal.email
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: config.smtpPrueba, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // 🔹 Aquí obtienes la URL de previsualización
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMain();
