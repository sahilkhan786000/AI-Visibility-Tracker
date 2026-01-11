import express from "express";
import cors from "cors";
import visibilityRoutes from "./routes/visibility.route";
import authRoutes from "./routes/auth.routes";
import sessionRoutes from "./routes/session.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/visibility", visibilityRoutes);
app.use("/sessions", sessionRoutes);

export default app;
