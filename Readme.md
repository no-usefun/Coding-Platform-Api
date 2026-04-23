# 🚀 CP Stats API

A lightweight backend service to fetch and aggregate competitive programming statistics from platforms like **LeetCode** and **CodeChef**.

Built using **Node.js + Express**, this API provides structured, cache-optimized data for use in personal dashboards and portfolios.

---

## ✨ Features

* 📊 LeetCode stats (solved count, difficulty breakdown, submissions, acceptance rate)
* 🧠 CodeChef stats (rating, stars, problems solved, contests)
* 🔥 Optional LeetCode heatmap (submission calendar)
* ⚡ In-memory caching for faster responses
* 🛡️ Rate limiting to prevent abuse
* 🌐 Public API (CORS enabled)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Axios
* Cheerio (for scraping)
* express-rate-limit
* Morgan

---

## 📡 API Endpoints

### 🔹 LeetCode

```
GET /api/leetcode/:username
```

**Query Params:**

* `calendar=true` → include submission heatmap

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

```
GET /api/codechef/:username
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
* 🚦 Rate limiting (per IP)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/cp-stats-api.git
cd cp-stats-api
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

This API can be deployed on:

* Render (free tier)
* Koyeb
* Railway (trial)

Make sure to set:

```
PORT=your_port
```

---

## 📌 Notes

* This API uses **unofficial public endpoints / scraping**, so responses may change if source platforms update their structure.
* Designed for **portfolio and personal dashboard use**, not heavy production workloads.

---

## 🤝 Usage

You are free to use this API in your own projects.
If you do, consider giving credit ⭐

---

## 📬 Author

Harsh
Built as part of a personal portfolio project.
