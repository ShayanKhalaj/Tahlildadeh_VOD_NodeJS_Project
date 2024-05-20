import PageModel from "../../common/PageModel.js";

class CommentSearchModel extends PageModel {
  commentId = "";
  isAccepted = false;
  answer = "";
  movieId = "";
  constructor({
    commentId = "",
    isAccepted = false,
    answer = "",
    movieId = "",
  }) {
    super();
    this.commentId = commentId;
    this.isAccepted = isAccepted;
    this.answer = answer;
    this.movieId = movieId;
  }
}

export default CommentSearchModel;
