import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { routes } from "./routes";
import cors from "cors";
import error from "./middlewares/error";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(error);

routes.use('/', (req: Request, res: Response) => {
    return res.json({"Welcome": "To Osten Moove API"})
})

app.listen(process.env.PORT || 3333, () => console.log("Server is running!"));
