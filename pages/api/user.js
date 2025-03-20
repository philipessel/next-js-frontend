import { getSession } from "@/lib/session";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getSession(req, res);
  const user = session.user || null;

  if (user) {
    return res.json({ isLoggedIn: true, ...user });
  } else {
    return res.json({ isLoggedIn: false });
  }
}
