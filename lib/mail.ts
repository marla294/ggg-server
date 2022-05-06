import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    ">
      <h2>hi!</h2>
      <p>${text}</p>
      <p>the go get groceries team</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'your password reset token',
    html: makeANiceEmail(`your password reset token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">click here to reset</a>
    `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`message sent!  preview it at ${getTestMessageUrl(info)}`);
  }
}
