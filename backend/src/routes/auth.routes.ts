import { Router } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { pool } from "../db";
import { signToken } from "../utils/auth";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const existing = await pool.query(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (existing.rowCount)
      return res.status(409).json({ error: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    const id = uuid();

    await pool.query(
      "INSERT INTO users (id,email,password_hash) VALUES ($1,$2,$3)",
      [id, email, hash]
    );

    res.json({ token: signToken({ userId: id }) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT id,password_hash FROM users WHERE email=$1",
      [email]
    );

    if (!result.rowCount)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok)
      return res.status(401).json({ error: "Invalid credentials" });

    res.json({ token: signToken({ userId: user.id }) });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
