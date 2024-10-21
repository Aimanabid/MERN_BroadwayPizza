const expressAsyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendmail = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Email Confirmation",
        text: "Thank you for your order! Your delivery is on its way and will reach you soon.",
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({ success: false, message: 'Error sending email' });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send({ success: true, message: 'Email sent successfully!' });
        }
    });
});

module.exports = { sendmail };
