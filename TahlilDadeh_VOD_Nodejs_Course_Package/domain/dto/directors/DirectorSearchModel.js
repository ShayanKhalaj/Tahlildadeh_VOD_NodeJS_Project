import PageModel from "../../common/PageModel.js";

class DirectorSearchModel extends PageModel {
  directorId = "";
  name = "";
  family = "";
  constructor({ directorId = "", name = "", family = "" }) {
    super();
    this.directorId = directorId;
    this.name = name;
    this.family = family;
  }
}

export default DirectorSearchModel
