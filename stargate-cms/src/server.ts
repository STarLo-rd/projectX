import express from "express";
import payload from "payload";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import profileRouter from "./routes/userProfile";
import Users from "./collections/Users";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// app.use(express.json({ limit: "50mb" }));
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

const authenticate = async (req, res, next) => {
  // Implement your user authentication logic here
  // This example uses a hypothetical "Authorization" header for demonstration purposes.
  // Replace with your actual authentication method (e.g., Passport.js)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  // Verify the token against your user database or authentication system
  // This is a placeholder, replace with your actual token verification logic
  const user = await Users.findByToken(token); // Replace `User` with your user model
  if (!user) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  req.user = user;
  next();
};

// app.use("/api/user", profileRouter);


app.listen(process.env.PAYLOAD_PORT, () => {
  console.log(`Server is listening on port ${process.env.PAYLOAD_PORT}`);
});
