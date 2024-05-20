class GenreListItems{
    genreId = "";
    genreName = "";
    description = "";
    constructor({ genreId = "", genreName = "", description = "" }) {
      this.genreId=genreId
      this.genreName=genreName
      this.description=description
    }
}
export default GenreListItems