import { type Request, type Response, Router } from "express";
import data from "../../fixtures/users";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(data);
});

export default router;
