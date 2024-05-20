class MovieListItems{
    movieId = "";
    movieName = "";
    coverImageUrl = "";
    coverImageAlter = "";
    movieVideoUrl = "";
    description = "";
    summary = "";
    time = "";
    minAge = 0;
    yearOfBuilt = 0;
    imdb = 0;
    hasSubText = false;
    categoryId = "";
    genreId = "";
    musicianId = "";
    authorId = "";
    constructor({
      movieId = "",
      movieName = "",
      coverImageUrl = "",
      coverImageAlter = "",
      movieVideoUrl = "",
      description = "",
      summary = "",
      time = "",
      minAge = 0,
      yearOfBuilt = 0,
      imdb = 0,
      hasSubText = false,
      categoryId = "",
      genreId = "",
      musicianId = "",
      authorId = "",
    }) {
      this.movieId = movieId;
      this.movieName = movieName;
      this.coverImageUrl = coverImageUrl;
      this.coverImageAlter = coverImageAlter;
      this.movieVideoUrl = movieVideoUrl;
      this.description = description;
      this.summary = summary;
      this.time = time;
      this.minAge = minAge;
      this.yearOfBuilt = yearOfBuilt;
      this.imdb = imdb;
      this.hasSubText = hasSubText;
      this.categoryId = categoryId;
      this.genreId = genreId;
      this.musicianId = musicianId;
      this.authorId = authorId;
    }
}

export default MovieListItems