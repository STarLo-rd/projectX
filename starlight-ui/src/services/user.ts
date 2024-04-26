// import { getAuthorizationHeader } from "../utils/utils";
// import { User } from "../types";
import AxiosInstance from "./axios-instance";
import { v4 as uuidv4 } from "uuid";

const getRandomPass = () => {
  const chars =
    "0123456789~!@#$%^&*()_+}{[]|abcdefghikjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let pass = "";
  const passLength = 16;
  for (let i = 0; i < passLength; i++) {
    const randPass = Math.floor(Math.random() * chars.length);
    pass += chars.substring(randPass, randPass + 1);
  }
  return pass;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createUser = async ({ name, email }: any) => {
  const password = getRandomPass();
  const ApiKey = uuidv4();
  const data = await AxiosInstance.post(`/users`, {
    email: email,
    password: password,
    name: name,
    apiKey: ApiKey,
    enableAPIKey: true,
    role: "user",
    credits: 200,
  });
  return data;
};
