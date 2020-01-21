import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-mailgun-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

console.log(process.env.API_KEY, process.env.DOMAIN);


export const sendMail = email => {
  const options = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "qkrtkddn76@gmail.com",
    to: address,
    subject: "Login Secret for Prismagram",
    html: `Hello! Your login secret it ${secret}. <br/>Copy paste on the app/wepsite to log in`
  };
  return sendMail(email);
};
