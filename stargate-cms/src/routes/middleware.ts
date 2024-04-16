import { Response, NextFunction } from "express";
import { Access, PayloadRequest } from "payload/types";
import { User } from "payload/dist/auth";
import jwt from "jsonwebtoken";
import {findUser} from "../utils";
const isUser: Access<any, User> = ({ req: { user } }) => {
  return user && user.collection === "users";
};
const accessControl = (
  req: PayloadRequest<User>,
  res: Response,
  next: NextFunction
) => {
  if (!isUser({ req })) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  res.locals["user"] = req.user;
  next();
};

const checkCredits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    console.log("token", token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify and decode the JWT token
    const decoded = jwt.decode(token);
    console.log("decoded", decoded);

    // Find the user based on the decoded token information
    const user = await findUser({
      _id: decoded.id,
      collection: decoded.collection,
    });
    console.log("available", user.credits);

    if (!user || user.credits < 1) {
      return res.status(402).json({ error: "Insufficient credits" });
    }

    // Attach the user to the request object for later use
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export { accessControl, checkCredits };
