import express from "express";
import payload from "payload";
import cors from "cors";
import roadmapRouter from "./routes/roadmap";
import explainRouter from "./routes/explainTopic";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import { checkCredits } from "./routes/middleware";
require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));


// Mailgun Auth configuration
const mailgunAuth: mg.Options = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: "sandbox7e0d795e72c74c6eaba12abf3b3b81f4.mailgun.org",
  },
};
const transport = nodemailer.createTransport(mg(mailgunAuth));


app.use(
  cors({
    origin: "*",
  })
);

// import mongoose from "mongoose"

// const uri = 'mongodb+srv://mohanpathi:Starlord%40123@innovateedu.btucsuh.mongodb.net/projectX?retryWrites=true&w=majority';

// mongoose.connect(uri)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
//   });


payload.init({
  secret: process.env.PAYLOAD_SECRET,
  express: app,
  onInit: async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
  email: {
    fromName: "From InnovateEdu",
    fromAddress: "starlord.clar@gmail.com",
    transport,
  },
});


async function main() {
  // send mail with defined transport object
  const info = await transport.sendMail({
    from: 'starlord.learn@gmail.com', // sender address
    to: "starlordclar@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);



// app.use("/api/user", profileRouter);


// app.use("/api/user", profileRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/explain", explainRouter);

app.listen(process.env.PAYLOAD_PORT, () => {
  console.log(`Server is listening on port ${process.env.PAYLOAD_PORT}`);
});
