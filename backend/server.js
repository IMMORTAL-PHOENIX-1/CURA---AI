import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import askRoutes from "./routes/askRoutes.js";
dotenv.config();
connectDB();

const app = express();

// allow frontend origin; adjust as needed
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "https://cura-ai-topaz.vercel.app",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      console.log("Blocked by CORS:", origin);
      console.log("Allowed origins:", allowedOrigins);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// Add ask route available at both /ask and /api/ask
app.use("/ask", askRoutes);
app.use("/api/ask", askRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
