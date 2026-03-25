import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import qs from "qs";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data } = await axios.get("https://api.tequila.kiwi.com/search/", {
      headers: {
        accept: "application/json",
        apikey: process.env.KIWI_API_KEY,
      },
      params: req.query,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return res.status(500).json({ error: "Failed to fetch search results" });
  }
}
