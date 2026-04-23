import axios from "axios";
import * as cheerio from "cheerio";

export async function getCodechef(username) {
  const { data } = await axios.get(
    `https://www.codechef.com/users/${username}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    },
  );

  const $ = cheerio.load(data);

  // 🔹 Basic stats
  const rating = $(".rating-number").text().trim();
  const stars = $(".rating").first().text().trim().match(/\d+★/)?.[0] || null;

  // 🔹 Structured section
  const solvedSection = $(".rating-data-section.problems-solved");
  const bodyText = $("body").text();

  let totalSolved = null;
  let totalContest = null;

  const match = bodyText.match(/Total Problems Solved:\s*(\d+)/);

  if (match) {
    totalSolved = Number(match[1]);
  }

  // Extract counts from h3
  solvedSection.find("h3").each((i, el) => {
    const text = $(el).text().trim();

    if (text.includes("Contests")) {
      const match = text.match(/\((\d+)\)/);
      if (match) totalContest = Number(match[1]);
    }
  });

  return {
    platform: "codechef",
    username,
    data: {
      rating: Number(rating),
      stars,
      totalSolved,
      totalContest,
    },
  };
}
