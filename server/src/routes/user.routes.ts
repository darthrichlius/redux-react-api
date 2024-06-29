import { type Request, type Response, Router } from "express";
import prismaClient from "@/services/prisma";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const users = await prismaClient.user.findMany();
  res.json(users);
});

export default router;
