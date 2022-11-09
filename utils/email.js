const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (data) => {
  const accessToken = await oAuth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_MAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailData = {
    from: process.env.SENDER_MAIL,
    to: data.to,
    subject: data.subject,
    text: data.text,
  };
  console.log(mailData);
  let info = await transporter.sendMail(mailData);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info.messageId;
};

// SEND MAIL WITH MAIL GUN
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});
module.exports.sendEmailWithMailGun = async (data) => {
  const result = await mg.messages.create(
    "sandbox4dd0d7a7a5494a8482ff35734a0a3c76.mailgun.org",
    {
      from: "Mailgun Sandbox <postmaster@sandbox4dd0d7a7a5494a8482ff35734a0a3c76.mailgun.org>",
      to: data.to,
      subject: data.subject,
      text: data.text,
    }
  );
  return result.id;
};
// .then(msg => console.log(msg)) // logs response data
// .catch(err => console.log(err)); // logs any error`;

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
