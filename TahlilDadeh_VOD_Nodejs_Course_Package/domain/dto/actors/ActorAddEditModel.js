class ActorAddEditModel {
  actorId = "";
  name = "";
  family = "";
  nation = "";

  constructor({actorId = "", name = "", family = "", nation = ""}) {
    this.actorId=actorId
    this.name=name
    this.family=family
    this.nation=nation
  }
}

export default ActorAddEditModel


// const actor = new ActorAddEditModel({
//     actorId:'aaa',
//     name:'keanu',
//     family:'reeves',
//     nation:'candian'
// });

// console.log(actor)

// actor.actorId = "1";
// actor.name = "sylvester";
// actor.family = "stalone";
// actor.nation = "american";
