import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import DirectorAddEditModel from "../../domain/dto/directors/DirectorAddEditModel.js";
import DirectorListItems from "../../domain/dto/directors/DirectorListItems.js";
import DirectorSearchModel from "../../domain/dto/directors/DirectorSearchModel.js";

class DirectorRepository {
  toCreateModel=(model = DirectorAddEditModel.prototype)=>{
    return{
      name:model.name,
      family:model.family,
      nation:model.nation
    }
  }

  toEditModel=(model = DirectorAddEditModel.prototype)=>{
    return{
      directorId:model.directorId,
      name:model.name,
      family:model.family,
      nation:model.nation
    }
  }


  create = async (model = DirectorAddEditModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("ثبت کارگردان");
    try {
      const result = await db.directors.create(this.toCreateModel(model));
      return op.succeeded("کارگردان با موفقیت ثبت شد", result.directorId);
    } catch (error) {
      return op.failed("ثبت کارگردان ناموفق", null);
    }
  };

  hasDirectorDuplicatedDirectorByThisNameAndFamilyAndNation = async (
    name = "",
    family = "",
    nation = ""
  ) => {
    const db = new TahlildadehVODDbContext();
    return await db.directors.find({
      name: name,
      family: family,
      nation: nation,
    });
  };

  update = async (model = DirectorAddEditModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("ویرایش کارگردان");
    try {
      const result = await db.directors.updateOne(
        { directorId: model.directorId },
        { $set: this.toEditModel(model) }
      );
      if (result.modifiedCount === 0 && result.acknowledged === false) {
        return op.failed("ویرایش کارگردان موفق نبود", model.directorId);
      }
      return op.succeeded("کارگردان با موفقیت ویرایش شد", model.directorId);
    } catch (error) {
      return op.failed("ویرایش کارگردان ناموفق", model.directorId);
    }
  };

  isExistedDirectorByThisId = async (directorId = "") => {
    const db = new TahlildadehVODDbContext();
    return await db.directors.find({ directorId: directorId });
  };

  delete = async (directorId = "") => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("حذف کارگردان");
    try {
      const result = await db.directors.deleteOne({ directorId: directorId });
      if (result.acknowledged === false) {
        return op.failed("کارگردان حذف نشد", directorId);
      }
      return op.succeeded("کارگردان با موفقیت حذف شد", directorId);
    } catch (error) {
      return op.failed("حذف کارگردان ناموفق", directorId);
    }
  };

  get = async (directorId = "") => {
    const db = new TahlildadehVODDbContext();
    return await db.directors.findOne({ directorId: directorId });
  };

  getAll = async () => {
    const db = new TahlildadehVODDbContext();
    return await db.directors.find({});
  };

  search = async (sm = DirectorSearchModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    try {
      let directors = db.directors.find({});
      if (sm.directorId.length > 0) {
        directors = directors.where("directorId").equals(sm.directorId);
      }
      if (sm.name.trim().length > 0) {
        directors = directors.where("name").equals({ $regex: sm.name });
      }
      if (sm.family.trim().length > 0) {
        directors = directors.where("family").equals({ $regex: sm.family });
      }
      const q = directors.select(["directorId", "name", "family", "nation"]);
      sm.documentCount = (await q).length;
      const results = q
        .sort([["family", "desc"]])
        .skip(sm.pageSize * sm.pageIndex)
        .limit(sm.pageSize)
        .clone();

        const searchList = []

        ;(await results).forEach((item)=>{
            searchList.push(new DirectorListItems({
                directorId:item.directorId,
                family:item.family,
                name:item.name,
                nation:item.nation
            }))
        })


        return searchList

    } catch (error) {
      throw new Error(error);
    }
  };
}

export default DirectorRepository;
