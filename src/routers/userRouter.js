import express from "express";
import {
  logout,
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  uploadFiles,
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware) //로그인 되어있는 사람만 로그아웃에 접근할 수 있게
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware) //로그인 되어있는 사람만 로그아웃에 접근할 수 있게
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin); //로그인된 사람은 `/`으로 리다이렉트
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin); //로그인된 사람은 `/`으로 리다이렉트
userRouter.get("/:id", see);

export default userRouter;
