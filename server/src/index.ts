import express, { type Express } from "express";
import { createServer } from "node:http";
import cors from "cors";
import bodyParser from "body-parser";
import { config as dotEnvConfig } from "dotenv";
import { bugRoutes, projectRoutes, userRoutes } from "@/routes";
import seed from "@/seed";

dotEnvConfig();

const PORT: string = process.env.PORT!;
const corsOrigin: string = process.env.CORS_ORIGIN!;
const app: Express = express();
const httpServer = createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: corsOrigin,
  })
);

seed();

app.use("/api/users/", userRoutes);
app.use("/api/projects/", projectRoutes);
app.use("/api/bugs/", bugRoutes);

httpServer.listen(PORT, () => {
  console.info(`Starting on PORT *:${PORT}`);
});
