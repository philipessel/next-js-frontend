
import { getSession } from "@/lib/session";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
      null,
      { headers: { Authorization: `Bearer ${session.api_token}` } }
    );
  } catch (err) {
    console.error("Backend logout failed:", err);
  }

  session.destroy();
  return res.json({ isLoggedIn: false });
}
