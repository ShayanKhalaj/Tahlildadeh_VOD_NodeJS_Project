import express from "express";
import MovieController from "../../controllers/pannel/MovieController.js";
import UploadFile from "../../../framwork/utilities/UploadFile.js";

const MovieRouter = express.Router();

MovieRouter.get("/", new MovieController().index);

MovieRouter.get("/search", new MovieController().search);

MovieRouter.get("/createModal", new MovieController().createModal);

MovieRouter.post(
  "/create",
  UploadFile.uploadImage("ui/public/Images").single("coverImageUrl"),
  new MovieController().create
);

MovieRouter.get("/createVideoModal", new MovieController().createVideoModal);

MovieRouter.post(
  "/createVideo",
  UploadFile.uploadVideo("ui/public/videos").single("movieVideoUrl"),
  new MovieController().createVideo
);

MovieRouter.post('/delete',new MovieController().delete)

MovieRouter.get('/createMovieActorsModal',new MovieController().createMovieActorsModal)

MovieRouter.post('/createActorMovie',new MovieController().createActorMovie)

MovieRouter.get('/showDetails',new MovieController().showDetails)

MovieRouter.get('/editMovieNameModal',new MovieController().editMovieNameModal)

MovieRouter.post('/editMovieName',new MovieController().editMovieName)

MovieRouter.post('/deleteActor',new MovieController().deleteActor)





export default MovieRouter;
