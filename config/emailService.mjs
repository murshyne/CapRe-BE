import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send the verification email
export const sendVerificationEmail = (email) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?email=${email}&token=${generateVerificationToken()}`;

  // Setup email data
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verification Email From Reppup',
    text: `Please verify your email by clicking the link below:\n\n${verificationLink}`,
    html: `<p>Please verify your email by clicking the link below:</p><p><a href="${verificationLink}">Verify Email</a></p>`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

// Helper function to generate a random verification token
const generateVerificationToken = () => {
  return Math.random().toString(36).substring(2, 15); // Generates a random string
};
