import express, { type Request, type Response, type Express } from "express";
import { createServer } from "node:http";
import cors from "cors";
import bodyParser from "body-parser";
import { config as dotEnvConfig } from "dotenv";

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

app.get("/", (_req: Request, res: Response) => {
  return res.send("Test");
});

httpServer.listen(PORT, () => {
  console.info(`Starting on PORT *:${PORT}`);
});
