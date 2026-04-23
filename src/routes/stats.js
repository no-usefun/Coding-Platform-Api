import express from "express";
import { getCodechef } from "../scrapers/codechef.js";
import { getLeetcode } from "../scrapers/leetcode.js";
import { cachedFetch } from "../utils/cache.js";

const router = express.Router();

router.get("/codechef/:username", async (req, res) => {
  try {
    const data = await cachedFetch(`cc-${req.params.username}`, () =>
      getCodechef(req.params.username),
    );

    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch CodeChef" });
  }
});

router.get("/leetcode/:username", async (req, res) => {
  try {
    const data = await cachedFetch(`lc-${req.params.username}`, () =>
      getLeetcode(req.params.username),
    );

    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch LeetCode" });
  }
});

export default router;
