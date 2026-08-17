import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";


const app = express();

app.use(
  cors({
    origin: "true",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Shiva Parvati Matrimonial Backend Running Successfully",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Shiva Parvati Matrimonial Backend Running Successfully",
  });
});

export default app;