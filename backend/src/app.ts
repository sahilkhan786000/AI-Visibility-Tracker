import express from "express";
import cors from "cors";
import visibilityRoutes from "./routes/visibility.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/visibility", visibilityRoutes);

export default app;
