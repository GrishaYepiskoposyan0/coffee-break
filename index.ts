import express from "express";
import { envConfig } from "./src/common/config/env.config";

const app = express();
const PORT = envConfig.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
