class CommentAddEditModel {
  commentId = "";
  text = "";
  isAccepted = false;
  answer = "";
  movieId = "";
  userId='';
  username=''
  constructor({
    commentId = "",
    text = "",
    isAccepted = false,
    answer = "",
    movieId = "",
    userId='',
    username=''
  }) {
    this.commentId=commentId
    this.text=text
    this.isAccepted=isAccepted
    this.answer=answer
    this.movieId=movieId
    this.userId=userId
    this.username=username
  }
}

export default CommentAddEditModel
