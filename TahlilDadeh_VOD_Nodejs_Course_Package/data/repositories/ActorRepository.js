import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import ActorAddEditModel from "../../domain/dto/actors/ActorAddEditModel.js";
import ActorListItems from "../../domain/dto/actors/ActorListItems.js";
import ActorSearchModel from "../../domain/dto/actors/ActorSearchModel.js";
import ActorSchema from "../../domain/schema/ActorSchema.js";

class ActorRepository {
  db = new TahlildadehVODDbContext();

  toCreateModel = (model = ActorAddEditModel.prototype) => {
    return {
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  toUpdateModel = (model = ActorAddEditModel.prototype) => {
    return {
      actorId: model.actorId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  toAddEditModel = (model = ActorSchema) => {
    return new ActorAddEditModel({
      actorId: model.actorId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    });
  };

  create = async (model = ActorAddEditModel.prototype) => {
    const op = new OperationResult("create actor");
    try {
      const actor = this.toCreateModel(model);
      const result = await this.db.actors.create(actor);
      return op.succeeded("actor created", result.actorId);
    } catch (error) {
      return op.failed(`actor did not create :: ${error}`, null);
    }
  };

  delete = async (actorId = "") => {
    const op = new OperationResult("delete actor");
    try {
      const result = await this.db.actors.deleteOne({ actorId: actorId });
      if (result.deletedCount === 0) {
        return op.failed("actor not found", null);
      }
      await this.db.actorMovies.deleteOne({ actorId: actorId });
      return op.succeeded("actor deleted", actorId);
    } catch (error) {
      return op.failed(`actor did not delete :: ${error}`, actorId);
    }
  };

  update = async (model = ActorAddEditModel.prototype) => {
    const op = new OperationResult("update actor");
    try {
      const actor = this.toUpdateModel(model);
      const result = await this.db.actors.updateOne(
        { actorId: model.actorId },
        { $set: actor }
      );
      if (result.acknowledged === true && result.modifiedCount > 0) {
        return op.succeeded("actor updated", model.actorId);
      } else {
        return op.failed("actor did not update", model.actorId);
      }
    } catch (error) {
      return op.failed(`actor did not update :: ${error}`, model.actorId);
    }
  };

  get = async (actorId = "") => {
    return this.toAddEditModel(
      await this.db.actors.findOne({ actorId: actorId })
    );
  };

  getAll = async () => {
    return await this.db.actors.find({});
  };

  search = async (sm = ActorSearchModel.prototype) => {
    try {
      let actors = this.db.actors.find({});
      if (sm.actorId.trim().length > 0) {
        actors = actors.where("actorId").equals(sm.actorId);
      }
      if (sm.name.trim().length > 0) {
        actors = actors.where("name").equals({ $regex: sm.name.trim() });
      }
      if (sm.family.trim().length > 0) {
        actors = actors.where("family").equals({ $regex: sm.family.trim() });
      }
      const q = actors.select(["actorId", "name", "family", "nation"]);
      sm.documentCount = (await q).length;

      const results = q
        .sort([["family", "desc"]])
        .skip(sm.pageSize * sm.pageIndex)
        .limit(sm.pageSize)
        .clone();

      const actorsList = [];

      (await results).forEach((item) => {
        actorsList.push(
          new ActorListItems({
            actorId: item.actorId,
            name: item.name,
            family: item.family,
            nation: item.nation,
          })
        );
      });

      return actorsList;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default ActorRepository;
