import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import CategoryAddEditModel from "../../domain/dto/categories/CategoryAddEditModel.js";
import CategoryListItems from "../../domain/dto/categories/CategoryListItems.js";
import CategorySearchModel from "../../domain/dto/categories/CategorySearchModel.js";
import CategorySchema from "../../domain/schema/CategorySchema.js";

class CategoryRepository {
  db = new TahlildadehVODDbContext();

  //utility method
  toCreateModel = (model = new CategoryAddEditModel()) => {
    return {
      categoryName: model.categoryName,
      description: model.description,
      categoryImageUrl: model.categoryImageUrl,
      categoryImageAlter: model.categoryImageAlter,
    };
  };

  toUpdateModel = (model = new CategoryAddEditModel()) => {
    return {
      categoryId: model.categoryId,
      categoryName: model.categoryName,
      description: model.description,
      categoryImageUrl: model.categoryImageUrl,
      categoryImageAlter: model.categoryImageAlter,
    };
  };

  toAddEditModel = (model = CategorySchema) => {
    return new CategoryAddEditModel({
      categoryId: model.categoryId,
      categoryName: model.categoryName,
      description: model.description,
      categoryImageAlter: model.categoryImageAlter,
      categoryImageUrl: model.categoryImageUrl,
    });
  };

  create = async (model = new CategoryAddEditModel()) => {
    const op = new OperationResult("create category");
    try {
      const category = this.toCreateModel(model);
      const result = await this.db.categories.create(category);
      return op.succeeded(
        "ثبت دسته بندی با موفقیت انجام شد",
        result.categoryId
      );
    } catch (error) {
      return op.failed(`ثبت دسته بندی ناموفق :: ${error}`, null);
    }
  };

  hasCategoryDuplicatedCategoryByThisCategoryName = async (
    categoryName = ""
  ) => {
    return await this.db.categories.find({ categoryName: categoryName });
  };

  delete = async (categoryId = "") => {
    const op = new OperationResult("delete category");
    try {
      const result = await this.db.categories.deleteOne({
        categoryId: categoryId,
      });
      if (result.deletedCount === 0) {
        return op.failed("category by this id not found", categoryId);
      }
      return op.succeeded("category deleted", categoryId);
    } catch (error) {
      return op.failed(`category delete failed :: ${error}`, categoryId);
    }
  };

  hasCategoryRelatedMoviesByThisCategoryId = async (categoryId = "") => {
    return await this.db.movies.find({ categoryId: categoryId });
  };

  update = async (model = new CategoryAddEditModel()) => {
    const op = new OperationResult("update category");
    try {
      const category = this.toUpdateModel(model);
      await this.db.categories.updateOne(
        { categoryId: model.categoryId },
        { $set: category }
      );
      return op.succeeded("category updated", model.categoryId);
    } catch (error) {
      return op.failed(`category update failed :: ${error}`, model.categoryId);
    }
  };

  isExistedCategoryByThisCategoryId = async (categoryId = "") => {
    return await this.db.categories.findOne({ categoryId: categoryId });
  };

  get = async (categoryId = "") => {
    const category = await this.db.categories.findOne({
      categoryId: categoryId,
    });
    console.log(categoryId)
    return this.toAddEditModel(category);
  };

  getAll = async () => {
    return await this.db.categories.find({});
  };

  search = async (sm = new CategorySearchModel()) => {
    try {
      //find
      let categories = this.db.categories.find({});
      //filter
      if (sm.categoryId.trim().length > 0) {
        categories = categories.where("categoryId").equals(sm.categoryId);
      }
      if (sm.categoryName.trim().length > 0) {
        categories = categories
          .where("categoryName")
          .equals({ $regex: sm.categoryName.trim() });
      }
      //select
      const q = categories.select([
        "categoryId",
        "categoryName",
        "description",
        "categoryImageUrl",
        "categoryImageAlter",
      ]);
      //sort => pagination
      sm.documentCount = (await q).length;
      const results = q
        .sort([["categoryName", "desc"]]) //asc
        .skip(sm.pageSize * sm.pageIndex)
        .limit(sm.pageSize)
        .clone();
      //return [CategoryListItems]
      const categoriesList = []

      ;(await results).forEach((item)=>{
        categoriesList.push(new CategoryListItems({
          categoryId:item.categoryId,
          categoryName:item.categoryName,
          description:item.description,
          categoryImageAlter:item.categoryImageAlter,
          categoryImageUrl:item.categoryImageUrl
        }))
      })

      return categoriesList

    } catch (error) {
      throw new Error(error);
    }
  };
}
export default CategoryRepository;
