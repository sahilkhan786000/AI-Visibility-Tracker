import express from "express";
import cors from "cors";
import path from "path";

import visibilityRoutes from "./routes/visibility.route";
import authRoutes from "./routes/auth.routes";
import sessionRoutes from "./routes/session.routes";

const app = express();


app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/api/visibility", visibilityRoutes);
app.use("/sessions", sessionRoutes);


const frontendDistPath = path.join(__dirname, "../dist");


app.use(express.static(frontendDistPath));


app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

export default app;
