import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tasksRoutes from "./routes/tasksRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", tasksRoutes);

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
