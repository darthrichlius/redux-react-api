import { type Request, type Response, Router } from "express";
import prismaClient from "@/services/prisma";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const bugs = await prismaClient.bug.findMany();
  res.json(bugs);
});

export default router;
