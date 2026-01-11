import { Router } from "express";
import { v4 as uuid } from "uuid";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", requireAuth, async (req: any, res) => {
  const result = await pool.query(
    "SELECT * FROM sessions WHERE user_id=$1 ORDER BY created_at DESC",
    [req.user.userId]
  );
  res.json(result.rows);
});

router.get("/:id", requireAuth, async (req: any, res) => {
  const result = await pool.query(
    "SELECT * FROM sessions WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.userId]
  );
  res.json(result.rows[0]);
});

router.post("/", requireAuth, async (req: any, res) => {
  const { category, brands, result } = req.body;

  const id = uuid();
  await pool.query(
    `
    INSERT INTO sessions (id,user_id,category,brands,result)
    VALUES ($1,$2,$3,$4,$5)
    `,
    [id, req.user.userId, category, brands, result]
  );

  res.json({ id, category, brands, result });
});

export default router;
