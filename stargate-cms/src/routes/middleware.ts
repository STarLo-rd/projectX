import { Response, NextFunction } from "express";
import { Access, PayloadRequest } from "payload/types";
import { User } from "payload/dist/auth";

const isUser: Access<any, User> = ({ req: { user } }) => {
    console.log("user" , user);
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

export { accessControl };
