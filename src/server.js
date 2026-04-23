import express from "express";
import cors from "cors";
import statsRoutes from "./routes/stats.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", statsRoutes);

app.get("/", (req, res) => {
  res.send("CP Stats API Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
