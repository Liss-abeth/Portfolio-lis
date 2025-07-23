const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  console.log("📨 sendEmail function triggered");

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.SMTP_USER,
      subject: `New Message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.response);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    // ✅ Improved error logging
    console.error("❌ Error sending email:", error.response || error.message || error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

module.exports = { sendEmail };
