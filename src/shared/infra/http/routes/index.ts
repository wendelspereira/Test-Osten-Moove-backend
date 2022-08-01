import express, { Request, Response } from "express";
import { businessRoutes } from "./business.routes";

const routes = express();

routes.use('/', (req: Request, res: Response) => {
    return res.redirect("https://test-osten-move-front-end.vercel.app/")
})

routes.use('/business', businessRoutes);

export { routes };