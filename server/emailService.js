const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify SMTP connection on startup
const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email service ready - SMTP credentials verified');
    return true;
  } catch (error) {
    console.error('❌ Email service FAILED to connect:', error.message);
    if (error.code === 'EAUTH') {
      console.error('   → Gmail App Password is INVALID or EXPIRED.');
      console.error('   → Go to https://myaccount.google.com/apppasswords to generate a new one.');
      console.error('   → Then update EMAIL_PASS in server/.env');
    }
    return false;
  }
};

const sendOTPEmail = async (toEmail, otpCode) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'Your Nutri AI Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Welcome to Nutri AI!</h2>
          <p style="color: #555; font-size: 16px;">Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; padding: 20px; text-align: center; background-color: #f9f9f9; border-radius: 8px; margin: 20px 0;">
            ${otpCode}
          </div>
          <p style="color: #555; font-size: 14px;">This code will expire in 5 minutes.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">If you did not request this code, please ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent to:', toEmail);
    return info;
  } catch (error) {
    console.error('❌ Error sending OTP email to', toEmail);
    console.error('   Error code:', error.code);
    console.error('   Error message:', error.message);
    
    // Attach a meaningful error type for the route handler
    if (error.code === 'EAUTH') {
      error.smtpErrorType = 'auth';
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
      error.smtpErrorType = 'network';
    } else {
      error.smtpErrorType = 'unknown';
    }
    throw error;
  }
};

module.exports = { sendOTPEmail, verifyConnection };
