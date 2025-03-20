
import { getSession } from "@/lib/session";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getSession(req, res);
  
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized: No active session found" });
  }

  const { updated_user } = req.body;
  if (!updated_user || typeof updated_user !== "object") {
    return res.status(400).json({ message: "Bad Request: Missing or invalid updated user data" });
  }

  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${session.user.id}`, 
      updated_user,
      {
        headers: { Authorization: `Bearer ${session.api_token}` },
      }
    );

    if (response.status === 200) {
      // Merge updated fields while preserving other user data
      Object.assign(session.user, updated_user);
      await session.save();
      return res.json({ success: true, message: "User updated successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update user" });
  }
}
