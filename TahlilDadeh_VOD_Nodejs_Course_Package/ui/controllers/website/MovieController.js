import TahlildadehVODDbContext from "../../../domain/context/TahlildadehVODDbContext.js";
import CommentAddEditModel from "../../../domain/dto/comments/CommentAddEditModel.js";

const db = new TahlildadehVODDbContext();

const index = async (req, res) => {
  const movie = await db.movies.findOne({ movieId: req.params.movieId });
  const comments = await db.comments.find({movieId:req.params.movieId})
  return res.render("websiteLayout", {
    pageTitle: "صفحه فیلم",
    template: "website/movie-details",
    name: req.session.name,
    family: req.session.family,
    movie: movie,
    comments:comments,
    csrfToken:req.csrfToken()
  });
};

const comment = async(req, res) => {
  const model = new CommentAddEditModel({
    answer: "",
    isAccepted: false,
    movieId: req.body.movieId,
    text: req.body.text,
    userId: req.session.passport.user._id,
    username: req.session.passport.user.username,
  });
  const comment = {
    answer: model.answer,
    isAccepted: model.isAccepted,
    movieId: model.movieId,
    text: model.text,
    userId: model.userId,
    username: model.username,
  };
  await db.comments.create(comment)
  return res.redirect(`/movie/${req.body.movieId}`)
};

export const MovieController = { index ,comment};
