import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import AuthorAddEditModel from "../../domain/dto/authors/AuthorAddEditModel.js";
import AuthorListItems from "../../domain/dto/authors/AuthorListItems.js";
import AuthorSearchModel from "../../domain/dto/authors/AuthorSearchModel.js";
import AuthorSchema from "../../domain/schema/AuthorSchema.js";

class AuthorRepository {
  toCreateModel = (model = AuthorAddEditModel.prototype) => {
    return {
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  toEditModel = (model = AuthorAddEditModel.prototype) => {
    return {
      authorId: model.authorId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    };
  };

  toAddEditModel = (model = AuthorSchema) => {
    return new AuthorAddEditModel({
      authorId: model.authorId,
      name: model.name,
      family: model.family,
      nation: model.nation,
    });
  };

  create = async (model = AuthorAddEditModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("ثبت نویسنده");
    try {
      const duplicatedAuthor =
        await this.hasAuthorDuplidatedAuthorByThisNameAndFamily(
          model.name,
          model.family
        );
      if (duplicatedAuthor.length > 0) {
        return op.failed("نویسنده با این مشخصات موجود است", null);
      }
      const result = await db.authors.create(this.toCreateModel(model));
      return op.succeeded("ثبت نویسنده با موفقیت انجام شد", result.authorId);
    } catch (error) {
      return op.failed(`ثبت نویسنده ناموفق :: ${error}`, null);
    }
  };
  hasAuthorDuplidatedAuthorByThisNameAndFamily = async (
    name = "",
    family = ""
  ) => {
    const db = new TahlildadehVODDbContext();
    return await db.authors.find({ name: name, family: family });
  };

  delete = async (authorId = "") => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("حذف نویسنده");
    try {
      const result = await db.authors.deleteOne({ authorId: authorId });
      if (result.deletedCount > 0) {
        return op.succeeded("نویسنده با موفقیت حذف شد", authorId);
      } else {
        return op.failed("نویسنده حذف نشد", authorId);
      }
    } catch (error) {
      return op.failed(`حذف نویسنده ناموفق :: ${error}`, authorId);
    }
  };

  update = async (model = AuthorAddEditModel.prototype) => {
    const db = new TahlildadehVODDbContext();
    const op = new OperationResult("ویرایش نویسنده");
    try {
      const author = this.toEditModel(model);
      const isAuthorExited = await this.isAuthorExitedByThisId(author.authorId);
      if (isAuthorExited.length === 0) {
        return op.failed("نویسنده با این شناسه یافت نشد", null);
      }
      const result = await db.authors.updateOne(
        { authorId: author.authorId },
        { $set: author }
      );
      if (result.modifiedCount > 0) {
        return op.succeeded("نویسنده با موفقیت ویرایش شد", model.authorId);
      } else {
        return op.failed("نویسنده با این شناسه ویرایش نشد", model.authorId);
      }
    } catch (error) {
      return op.failed(`ویرایش نویسنده ناموفق :: ${error}`, model.authorId);
    }
  };

  isAuthorExitedByThisId = async (authorId = "") => {
    const db = new TahlildadehVODDbContext();
    return await db.authors.find({ authorId: authorId });
  };

  get = async (authorId = "") => {
    const db = new TahlildadehVODDbContext();
    return this.toAddEditModel(await db.authors.findOne({ authorId: authorId }))
  };

  getAll = async () => {
    const db = new TahlildadehVODDbContext();
    return await db.authors.find({});
  };

  search = async (sm = AuthorSearchModel.prototype) => {
    try {
      const db = new TahlildadehVODDbContext();
      let authors = db.authors.find({});
      if (sm.authorId.length > 0)
        authors = authors.where("authorId").equals(sm.authorId);
      if (sm.name.trim().length > 0)
        authors = authors.where("name").equals({ $regex: sm.name });
      if (sm.family.trim().length > 0)
        authors = authors.where("family").equals({ $regex: sm.family });
      let q = authors.select(["authorId", "name", "family", "nation"]);
      sm.documentCount = (await q).length;
      const results = q
        .sort([["family", "desc"]])
        .skip(sm.pageSize * sm.pageIndex)
        .limit(sm.pageSize)
        .clone();

        const searchList=[]

        ;(await results).forEach((item)=>{
            searchList.push(new AuthorListItems({
                authorId:item.authorId,
                name:item.name,
                family:item.family,
                nation:item.nation
            }))
        })

        return searchList

    } catch (error) {
      throw new Error(error);
    }
  };
}

export default AuthorRepository;
