import express, { Express } from "express";
import { envConfig } from "./src/common/config/env.config";
import { router } from "./src/router";

const app: Express = express();
const PORT: number = envConfig.PORT || 3000;

/// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/// Router
app.use("/api", router);

app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
