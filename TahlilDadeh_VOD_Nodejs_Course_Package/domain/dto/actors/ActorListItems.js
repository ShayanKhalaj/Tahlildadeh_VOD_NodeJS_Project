class ActorListItems {
  actorId = "";
  name = "";
  family = "";
  nation = "";
  constructor({ actorId = "", name = "", family = "", nation = "" }) {
    this.actorId=actorId
    this.name=name
    this.family=family
    this.nation=nation
  }
}

export default ActorListItems
