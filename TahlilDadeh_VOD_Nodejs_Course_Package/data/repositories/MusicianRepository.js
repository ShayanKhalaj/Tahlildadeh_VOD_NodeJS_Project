import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import MusicianAddEditModel from "../../domain/dto/musicians/MusicianAddEditModel.js";
import MusicianListItems from "../../domain/dto/musicians/MusicianListItems.js";
import MusicianSearchModel from "../../domain/dto/musicians/MusicianSearchModel.js";
import MusicianSchema from "../../domain/schema/MusicianSchema.js";

class MusicianRepository {
  toCreateModel = (model = MusicianAddEditModel.prototype) => {
    return {
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };
  toEditModel = (model = MusicianAddEditModel.prototype) => {
    return {
      musicianId: model.musicianId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };
  toAddEditModel = (model = MusicianSchema) => {
    return new MusicianAddEditModel({
      musicianId: model.musicianId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    });
  };
  create = async (model = MusicianAddEditModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("ثبت آهنگساز");
    try {
      const result = await db.musicians.create(this.toCreateModel(model));
      return op.succeeded("آهنگساز با موفقیت ثبت شد", result.musicianId);
    } catch (error) {
      return op.failed(`ثبت آهنگساز ناموفق :: ${error}`, null);
    }
  };

  hasMusicianDuplicatedMusicianByThisNameAndFamilyAndNation = async (
    name = "",
    family = "",
    nation = ""
  ) => {
    const db = new TahlildadehVODDbContext();
    return await db.musicians.find({
      name: name,
      family: family,
      nation: nation,
    });
  };

  update = async (model = MusicianAddEditModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("ویرایش آهنگساز");
    try {
      const editModel =this.toEditModel(model)
      const result = await db.musicians.updateOne({musicianId:model.musicianId},{$set:editModel});
      if (result.acknowledged === false)
        return op.failed(`آهنگساز ویرایش نشد`, model.musicianId);
      return op.succeeded("آهنگساز با موفقیت ویرایش شد", model.musicianId);
    } catch (error) {
      return op.failed(`ویرایش آهنگساز ناموفق :: ${error}`, model.musicianId);
    }
  };

  isMusicianExistedByThisId = async (musicianId = "") => {
    const db = new TahlildadehVODDbContext();
    return await db.musicians.findOne({ musicianId: musicianId });
  };

  delete = async (musicianId = "") => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("حذف آهنگساز");
    try {
      const result = await db.musicians.deleteOne({ musicianId: musicianId });
      if (result.acknowledged === false)
        return op.failed("آهنگساز حذف نشد", musicianId);
      return op.succeeded("آهنگساز با موفقیت حذف شد", musicianId);
    } catch (error) {
      return op.failed(`حذف آهنگساز ناموفق :: ${error}`, musicianId);
    }
  };

  hasMusicianRelatedMoviesByThisId = async (musicianId = "") => {
    const db = new TahlildadehVODDbContext();
    return await db.movies.find({ musicianId: musicianId });
  };

  get = async (musicianId = "") => {
    const db = new TahlildadehVODDbContext();
    return this.toAddEditModel(
      await db.musicians.findOne({ musicianId: musicianId })
    );
  };

  getAll = async () => {
    const db = new TahlildadehVODDbContext();
    return await db.musicians.find({});
  };

  search = async (sm = MusicianSearchModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    try {
      let musicians = db.musicians.find({});
      if (sm.musicianId.length > 0)
        musicians = musicians.where("musicianId").equals(sm.musicianId);
      if (sm.name.trim().length > 0)
        musicians = musicians.where("name").equals({ $regex: sm.name });
      if (sm.family.trim().length > 0)
        musicians = musicians.where("family").equals({ $regex: sm.family });
      const q = musicians.select(["musicianId", "name", "family", "nation"]);
      sm.documentCount = (await q).length;
      const results = q
        .sort([["family", "asc"]])
        .skip(sm.pageSize * sm.pageIndex)
        .limit(sm.pageSize)
        .clone();

      const searchList = [];
      (await results).forEach((item) => {
        searchList.push(
          new MusicianListItems({
            musicianId: item.musicianId,
            name: item.name,
            family: item.family,
            nation: item.nation,
          })
        );
      });

      return searchList;
      
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default MusicianRepository;
