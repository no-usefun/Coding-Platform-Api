import express from "express";
import cors from "cors";
import statsRoutes from "./routes/stats.js";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));

const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Harsh CP Stats API");
  next();
});

app.use("/api", statsRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("CP Stats API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
