import { Router } from "express";
import bcrypt from "bcrypt";
import { users, createUser } from "../store/db";
import { signToken } from "../utils/auth";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = createUser(email, hash);
  res.json({ token: signToken({ userId: user.id }) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json({ token: signToken({ userId: user.id }) });
});

export default router;
