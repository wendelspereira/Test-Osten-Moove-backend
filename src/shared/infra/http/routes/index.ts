import express, { Request, Response } from "express";
import { businessRoutes } from "./business.routes";

const routes = express();

routes.use('/business', businessRoutes);

export { routes };