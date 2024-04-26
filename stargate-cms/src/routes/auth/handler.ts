import { RequestHandler } from "express";
import { DefaultParams } from "../types";
import payload from "payload";
import { validateSSOToken } from "./validator";
import jwt from "jsonwebtoken";

export const SSOLogin: RequestHandler<DefaultParams, any, any> = async (
  req,
  res,
  _next
) => {
  try {
    const { ssoToken } = req.body;
    const userData = await validateSSOToken(ssoToken);

    if (!userData) {
      return res.status(401).json({ error: "Invalid SSO token" });
    }

    // Fetch the user from Payload CMS based on the email
    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        email: { equals: userData.email },
      },
    });

    console.log(users);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    console.log(process.env.PAYLOAD_SECRET);

    // Generate a JWT token with a 12-hour expiration time
    const token = jwt.sign(
      {
        id: user.id,
        collection: "users",
        email: user.email,
      },
      "5d91a543789ac95f1514ac82db1ee967",
      { expiresIn: "12h" }
    );

    return res.json({ token });
  } catch (err) {
    payload.logger.error(err.message);
    return res.status(500).send(err.message);
  }
};
