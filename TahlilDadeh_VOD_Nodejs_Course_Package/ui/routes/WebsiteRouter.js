import express from "express";
import HomeRouter from "./website/HomeRouter.js";
import MovieRouter from "./website/MovieRouter.js";
import { AuthSetting } from "../../security/settings/AuthSetting.js";
import CategoryRouter from "./website/CategoryRouter.js";
import StaticPageRouter from "./website/StaticPageRouter.js";

const WebsiteRouter = express.Router();

WebsiteRouter.use("/", HomeRouter);

WebsiteRouter.use("/movie",AuthSetting.isAuthorized, MovieRouter);
WebsiteRouter.use("/categories", CategoryRouter);
WebsiteRouter.use("/", StaticPageRouter);

export default WebsiteRouter;
