class DirectorAddEditModel {
  directorId = "";
  name = "";
  family = "";
  nation = "";
  constructor({ directorId = "", name = "", family = "", nation = "" }) {
    this.directorId=directorId
    this.name=name
    this.family=family
    this.nation=nation
  }
}

export default DirectorAddEditModel
