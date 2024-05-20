import PageModel from "../../common/PageModel.js";

class MusicianSearchModel extends PageModel {
  musicianId = "";
  name = "";
  family = "";
  constructor({ musicianId = "", name = "", family = "" }) {
    super();
    this.musicianId = musicianId;
    this.name = name;
    this.family = family;
  }
}

export default MusicianSearchModel
