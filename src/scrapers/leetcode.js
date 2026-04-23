import axios from "axios";

export async function getLeetcode(username) {
  const { data } = await axios.get(
    `https://alfa-leetcode-api.onrender.com/${username}/solved`,
  );

  if (!data || !data.solvedProblem) {
    throw new Error("Invalid response");
  }

  return {
    platform: "leetcode",
    username,
    totalSolved: data.solvedProblem,
    easy: data.easySolved,
    medium: data.mediumSolved,
    hard: data.hardSolved,
  };
}
