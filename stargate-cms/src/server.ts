import express from "express";
import payload from "payload";
import cors from "cors";
import roadmapRouter from "./routes/roadmap";
import explainRouter from "./routes/explainTopic";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));\

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


// app.use("/api/user", profileRouter);


// app.use("/api/user", profileRouter);
app.use("/api/roadmap", roadmapRouter);
app.use("/api/explain", explainRouter);

app.listen(process.env.PAYLOAD_PORT, () => {
  console.log(`Server is listening on port ${process.env.PAYLOAD_PORT}`);
});
