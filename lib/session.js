// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

/*
import { getIronSession } from "iron-session";

const sessionOptions = {
  cookieName: "clm.mw",
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession(req, res) {
  return getIronSession(req, res, sessionOptions);
}
*/


import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import { getIronSession } from "iron-session";

const sessionOptions = {
  cookieName: "clm.mw",
  password: process.env.SECRET_COOKIE_PASSWORD || "default_password", // Ensure fallback
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession(req, res) {
  return getIronSession(req, res, sessionOptions);
}

// Debugging: Print environment variables
console.log("SECRET_COOKIE_PASSWORD:", process.env.SECRET_COOKIE_PASSWORD);
