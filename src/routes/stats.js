import express from "express";
import { getCodechef } from "../scrapers/codechef.js";
import { getLeetcode } from "../scrapers/leetcode.js";
import { cachedFetch } from "../utils/cache.js";

const router = express.Router();

router.get("/codechef/:username", async (req, res) => {
  const username = req.params.username?.trim();

  if (!username) {
    return res.status(400).json({ error: "Invalid username" });
  }

  try {
    const data = await cachedFetch(
      `cc:${username}`,
      () => getCodechef(username),
      60 * 60 * 1000,
    );

    res.json(data);
  } catch (err) {
    console.error("CodeChef error:", err.message);

    res.status(500).json({
      error: "Failed to fetch CodeChef",
      username,
    });
  }
});

router.get("/leetcode/:username", async (req, res) => {
  const username = req.params.username?.trim();

  if (!username) {
    return res.status(400).json({ error: "Invalid username" });
  }

  const includeCalendar = req.query.calendar === "true";

  try {
    const data = await cachedFetch(
      `lc:${username}:calendar=${includeCalendar}`,
      () => getLeetcode(username, includeCalendar),
      30 * 60 * 1000,
    );

    res.json(data);
  } catch (err) {
    console.error("LeetCode error:", err.message);

    res.status(500).json({
      error: "LeetCode fetch failed",
      username,
    });
  }
});

export default router;
