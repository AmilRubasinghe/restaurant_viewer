const nodemailer = require("nodemailer");
const { TE } = require("../../helper");
const { MAIL_SERVICE, MAIL_USER, MAIL_PASSWORD } =
  require("../../../config/config").MAIL_SERVER;

const testMailSender = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const message = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return nodemailer.getTestMessageUrl(message);
  } catch (error) {
    console.log(error);
    TE(error);
  }
};

const mailSender = async (sendMailData) => {
  const { toEmail, subject, body } = sendMailData;
  try {
    const config = {
      service: MAIL_SERVICE,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    };

    const transporter = await nodemailer.createTransport(config);

    const message = {
      from: MAIL_USER,
      to: toEmail,
      subject: subject,
      html: body,
    };

    const res = await transporter.sendMail(message);

    return res?.messageId;
  } catch (error) {
    console.log(error);
    TE(error);
  }
};

module.exports = {
  testMailSender,
  mailSender,
};
