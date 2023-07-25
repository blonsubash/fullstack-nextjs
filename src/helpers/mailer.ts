import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hasedToken = await bcryptjs.hash(userId?.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "470e41a484acd7",
        pass: "bbb24888045734",
      },
    });

    const mailOptions = {
      from: "fullstack@yopmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "verify you email" : "Reset your mail",
      html: `<p> Click here <a href ="${process.env.DOMAIN}/verifyemail?token=${hasedToken}"> here</a> or copy paste the link below to your browser.
      
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
      </p>`,
    };

    await transport.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
