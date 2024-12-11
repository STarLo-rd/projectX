import express from "express";
import payload from "payload";
import cors from "cors";
import roadmapRouter from "./routes/roadmap";
import explainRouter from "./routes/explainTopic";
import "./scheduled-tasks"; // This will automatically schedule your tasks when the server starts
import dreamAnalysisRouter from "./routes/dreamAnalysis";
require("dotenv").config();
const app = express();
import authRouter from "./routes/auth";
import profileRouter from "./routes/userProfile";

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Mailgun Auth configuration
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
});

// app.get("/api/users/me", async (req, res) => {
//   console.log("called");
//   console.log(req.headers.authorization);
//   const jwtToken = req.headers.authorization.slice(4);
//   console.log(jwtToken);

//   const userData = jwt.decode(jwtToken);
//   console.log(userData);

//   const { docs: users } = await payload.find({
//     collection: "users",
//     where: {
//       email: { equals: userData.email },
//     },
//   });

//   console.log(users);

//   return res.json({
//     user: users[0],
//     token: jwtToken,
//   });
// });

// app.use("/api/user", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/profile", profileRouter)
app.use("/api/explain", explainRouter);
app.use("/api/dream", dreamAnalysisRouter);

app.listen(process.env.PAYLOAD_PORT, () => {
  console.log(`Server is listening on port ${process.env.PAYLOAD_PORT}`);
});
