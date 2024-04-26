import { Resend } from "resend";
const resend = new Resend("re_XWXXF5Lm_9kdoTLM6CBJ24Nhn7aZPBQP6");

const sendVerificationEmail = async (userData) => {
  console.log(userData)
  const { email } = userData;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ProjectX <onboarding@resend.dev>',
      to: [email],
      subject: 'Verify your email address',
      html: `
        <p>Hello,</p>
        <p>Please click the link below to verify your email address:</p>
        <a href="https://yourproject.com/verify-email?token=YOUR_VERIFICATION_TOKEN">Verify Email</a>
      `,
    });

    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', data);
    }
  } catch (err) {
    console.error('Error sending verification email:', err);
  }
};


export { sendVerificationEmail };
