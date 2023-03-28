import express from "express";
import { crawlerController } from "~/controllers";

const crawlerRoute = express.Router();

crawlerRoute.get("/detail", crawlerController.getCrawlerDetail);
crawlerRoute.get("/search", crawlerController.getCrawlerSearch);

export default crawlerRoute;