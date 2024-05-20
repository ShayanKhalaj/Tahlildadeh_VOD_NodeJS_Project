import PageModel from "../../common/PageModel.js";

class ActorSearchModel extends PageModel {
  actorId = "";
  name = "";
  family = "";
  constructor({ actorId = "", name = "", family = "" }) {
    super()
    this.actorId=actorId
    this.name=name
    this.family=family
  }
}

export default ActorSearchModel
