# 🚀 CP Stats API

A lightweight backend service to fetch and aggregate competitive programming statistics from platforms like **LeetCode** and **CodeChef**.

Built using **Node.js + Express**, this API provides structured, cache-optimized data for use in personal dashboards and portfolios.

---

## 🌐 Live API

👉 https://cp-stats-api.onrender.com/

---

## ✨ Features

* 📊 LeetCode stats (solved count, difficulty breakdown, submissions, acceptance rate)
* 🧠 CodeChef stats (rating, stars, problems solved, contests)
* 🔥 Optional LeetCode heatmap (submission calendar)
* ⚡ In-memory caching with TTL
* 🔁 Deduplicated concurrent requests
* 🛡️ Rate limiting to prevent abuse
* 🌐 Public API (CORS enabled)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Axios
* Cheerio (scraping)
* express-rate-limit
* Morgan

---

## 📡 API Endpoints

### 🔹 LeetCode

```http
GET /api/leetcode/:username
```

**Query Params:**

* `calendar=true` → include submission heatmap

**Example:**

```
https://cp-stats-api.onrender.com/api/leetcode/Harsh636_
```

**Response:**

```json
{
  "platform": "leetcode",
  "username": "Harsh636_",
  "data": {
    "total": {
      "solved": 85,
      "total": 3907
    },
    "difficulty": {
      "easy": { "solved": 23, "total": 938 },
      "medium": { "solved": 54, "total": 2045 },
      "hard": { "solved": 8, "total": 924 }
    },
    "stats": {
      "totalSubmissions": 247,
      "acceptedSubmissions": 176,
      "acceptanceRate": "71.26"
    }
  }
}
```

---

### 🔹 CodeChef

```http
GET /api/codechef/:username
```

**Example:**

```
https://cp-stats-api.onrender.com/api/codechef/no_usefun
```

**Response:**

```json
{
  "platform": "codechef",
  "username": "no_usefun",
  "data": {
    "rating": 1345,
    "stars": "1★",
    "totalSolved": 152,
    "totalContest": 6
  }
}
```

---

## ⚡ Performance Optimizations

* ⏱️ Cached responses (TTL-based)
* 🔁 Deduplicated concurrent requests
* 🚦 Rate limiting per IP
* 💤 Render free-tier cold start handling (health check endpoint)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/no-usefun/Coding-Platform-Api.git
cd Coding-Platform-Api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## 🌍 Deployment

Currently deployed on **Render (free tier)**.

⚠️ Note:

* The service may go idle after inactivity (~10–15 min)
* First request may take a few seconds (cold start)

---

## 📌 Notes

* Uses **unofficial APIs and scraping**, so data may change if platforms update their structure
* Intended for **portfolio and personal use**, not high-scale production systems

---

## 🤝 Usage

You are free to use this API in your own projects.

If you do, consider:

* giving credit ⭐
* or linking back to this repository

---

## 📬 Author

**Harsh**
Built as part of a personal portfolio project
