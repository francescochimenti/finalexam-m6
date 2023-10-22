const express = require("express");
const { createTransport } = require("nodemailer");
const email = express.Router();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jazlyn.boyle47@ethereal.email",
    pass: "4Ever99WUDW2r1fj9H",
  },
});

email.post("/send-mail", (req, res) => {
  const mailOptions = {
    from: "noreply@naturesnotes.com",
    to: req.body.to,
    subject: "email test",
    text: "email test",
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).send("Internal Error");
    } else {
      console.log("Email sent!");
      res.status(200).send("Email sent successfully!");
    }
  });
});

module.exports = email;
