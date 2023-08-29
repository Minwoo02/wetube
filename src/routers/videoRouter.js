import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware) //로그인 되어있는 사람만 접근할 수 있게
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware) //로그인 되어있는 사람만 접근할 수 있게
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware) //로그인 되어있는 사람만 접근할 수 있게
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

export default videoRouter;
