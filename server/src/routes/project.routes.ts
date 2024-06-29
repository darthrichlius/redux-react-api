import { type Request, type Response, Router } from "express";
import prismaClient from "@/services/prisma";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const projects = await prismaClient.project.findMany();
  res.json(projects);
});

export default router;
