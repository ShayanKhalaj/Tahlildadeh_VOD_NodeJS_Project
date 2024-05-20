import express from "express";
import { UserController } from "../../controllers/security/UserController.js";
import { AuthSetting } from "../../../security/settings/AuthSetting.js";
import { AttackSetting } from "../../../security/settings/AttackSetting.js";
import { BodyParserSetting } from "../../../security/settings/BodyParserSetting.js";

const UserRouter = express.Router();

UserRouter.get("/signup", UserController.getSignUpPage);

UserRouter.post("/signup", UserController.signup);

UserRouter.get("/login", UserController.getLoginPage);

UserRouter.post(
  "/login",
  BodyParserSetting.parseForm(),
  AttackSetting.csrfProtection(),
  AuthSetting.isLoggedIn(),
  UserController.login
);

UserRouter.get(
  "/logout",
  UserController.logout
);

export default UserRouter;
