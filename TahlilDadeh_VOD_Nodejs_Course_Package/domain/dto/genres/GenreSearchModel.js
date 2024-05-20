import PageModel from "../../common/PageModel.js";

class GenreSearchModel extends PageModel {
  genreId = "";
  genreName = "";
  constructor({ genreId = "", genreName = "" }) {
    super();
    this.genreId = genreId;
    this.genreName = genreName;
  }
}

export default GenreSearchModel
