import PageModel from "../../common/PageModel.js";

class MovieSearchModel extends PageModel {
  movieId = "";
  movieName = "";
  minAge = 0;
  imdb = 0;
  hasSubText = false;
  categoryId = "";
  genreId = "";
  musicianId = "";
  authorId = "";
  directorId=''
  constructor({
    movieId = "",
    movieName = "",
    minAge = 0,
    imdb = 0,
    hasSubText = false,
    categoryId = "",
    genreId = "",
    musicianId = "",
    authorId = "",
    directorId=''
  }) {
    super();
    this.movieId = movieId;
    this.movieName = movieName;
    this.minAge = minAge;
    this.imdb = imdb;
    this.hasSubText = hasSubText;
    this.categoryId = categoryId;
    this.genreId = genreId;
    this.musicianId = musicianId;
    this.authorId = authorId;
    this.directorId=directorId
  }
}

export default MovieSearchModel;
