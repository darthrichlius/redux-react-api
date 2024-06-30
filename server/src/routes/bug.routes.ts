import { type Request, type Response, Router } from "express";
import prismaClient from "@/services/prisma";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const bugs = await prismaClient.bug.findMany();
  res.json({
    status: true,
    data: bugs,
  });
});

router.patch("/:id/resolve", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const _id = parseInt(id);
    if (!_id) throw new Error(":id parameter must be from type number");

    const updated = await prismaClient.bug.update({
      where: {
        id: _id,
      },
      data: {
        resolved: true,
      },
    });
    res.json({
      status: true,
      data: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const bug = req.body;
    const added = await prismaClient.bug.create({
      data: bug,
    });
    res.json({
      status: true,
      data: added,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: (err as Error).message,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const _id = parseInt(id);
    if (!_id) throw new Error(":id parameter must be from type number");

    await prismaClient.bug.delete({
      where: {
        id: _id,
      },
    });
    res.json({
      status: true,
      data: _id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: (err as Error).message,
    });
  }
});

export default router;
