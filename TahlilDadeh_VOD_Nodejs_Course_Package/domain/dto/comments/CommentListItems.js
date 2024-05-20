class CommentListItems{
    commentId = "";
    text = "";
    isAccepted = false;
    answer = "";
    movieId = "";
    constructor({
      commentId = "",
      text = "",
      isAccepted = false,
      answer = "",
      movieId = "",
    }) {
      this.commentId=commentId
      this.text=text
      this.isAccepted=isAccepted
      this.answer=answer
      this.movieId=movieId
    }
}

export default CommentListItems