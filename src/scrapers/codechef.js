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

  const rating = $(".rating-number").text().trim();
  const stars = $(".rating").text().trim();

  return {
    platform: "codechef",
    username,
    rating: Number(rating),
    stars,
  };
}
