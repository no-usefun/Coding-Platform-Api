import axios from "axios";

function parseCalendar(calendar) {
  return Object.entries(calendar).map(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000).toISOString().split("T")[0];

    return { date, count };
  });
}

export async function getLeetcode(username, includeCalendar = false) {
  const BASE_URL =
    process.env.LEETCODE_API || "https://alfa-leetcode-api.onrender.com";

  const res = await axios.get(`${BASE_URL}/${username}/profile`);

  const data = res.data;

  const ranking = data.ranking;

  // 🔹 submissions
  const totalSub = data.matchedUserStats.totalSubmissionNum.find(
    (x) => x.difficulty === "All",
  );

  const acceptedSub = data.matchedUserStats.acSubmissionNum.find(
    (x) => x.difficulty === "All",
  );

  const totalSubmissions = totalSub?.submissions || 0;
  const acceptedSubmissions = acceptedSub?.submissions || 0;

  const acceptanceRate =
    totalSubmissions > 0
      ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(2)
      : "0.00";

  let calendarRaw = null;
  let calendarParsed = null;

  if (includeCalendar) {
    const raw = data.submissionCalendar;

    // limit size
    const sliced = Object.fromEntries(Object.entries(raw).slice(-180));

    calendarRaw = sliced;
    calendarParsed = parseCalendar(sliced);
  }

  return {
    platform: "leetcode",
    username,
    data: {
      total: {
        solved: data.totalSolved,
        total: data.totalQuestions,
      },

      difficulty: {
        easy: {
          solved: data.easySolved,
          total: data.totalEasy,
        },
        medium: {
          solved: data.mediumSolved,
          total: data.totalMedium,
        },
        hard: {
          solved: data.hardSolved,
          total: data.totalHard,
        },
      },

      stats: {
        totalSubmissions,
        acceptedSubmissions,
        acceptanceRate,
        ranking,
      },

      ...(includeCalendar && {
        calendar: {
          raw: calendarRaw,
          parsed: calendarParsed,
        },
      }),
    },
  };
}
