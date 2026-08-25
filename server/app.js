import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://matrimonial-alpha.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/chat", chatRoutes);
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Shiva Parvati Matrimonial Backend Running Successfully",
//   });
// });
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Shiva Parvati Matrimonial Backend Running Successfully",
  });
});

export default app;