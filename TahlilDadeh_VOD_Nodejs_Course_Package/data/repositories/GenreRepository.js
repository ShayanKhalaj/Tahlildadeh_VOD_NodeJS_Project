import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import GenreAddEditModel from "../../domain/dto/genres/GenreAddEditModel.js";
import GenreListItems from "../../domain/dto/genres/GenreListItems.js";
import GenreSearchModel from "../../domain/dto/genres/GenreSearchModel.js";
import GenreSchema from "../../domain/schema/GenreSchema.js";

class GenreRepository {
  db = new TahlildadehVODDbContext();

  toCreateModel = (model = GenreAddEditModel.prototype) => {
    return {
      genreName: model.genreName,
      description: model.description,
    };
  };

  toEditModel = (model = GenreAddEditModel.prototype) => {
    return {
      genreId: model.genreId,
      genreName: model.genreName,
      description: model.description,
    };
  };

  toAddEditModel = (model = GenreSchema) => {
    return new GenreAddEditModel({
      genreId: model.genreId,
      genreName: model.genreName,
      description: model.description,
    });
  };

  create = async (model = GenreAddEditModel.prototype) => {
    const op = new OperationResult("ثبت ژانر");
    try {
      const result = await this.db.genres.create(this.toCreateModel(model));
      return op.succeeded("ژانر با موفقیت ثبت شد", result.genreId);
    } catch (error) {
      return op.failed(`ثبت ژانر ناموفق :: ${error}`, null);
    }
  };

  hasGenreDuplicatedGenreByThisGenreName = async (genreName = "") => {
    return await this.db.genres.find({ genreName: genreName });
  };

  update = async (model = GenreAddEditModel.prototype) => {
    const op = new OperationResult('ویرایش ژانر')
    try {
        const filter = {genreId:model.genreId}
        const editModel = {$set:this.toEditModel(model)}
        const result = await this.db.genres.updateOne(filter,editModel)
        if(result.acknowledged===false){
            return op.failed('ژانر ویرایش نشد',model.genreId)
        }
        return op.succeeded('ویرایش ژانر با موفقیت انجام شد',model.genreId)
    } catch (error) {
        return op.failed(`ویرایش ژانر ناموفق :: ${error}`,model.genreId)
    }
  };

  isGenreExistedByThisId=async(genreId='')=>{
    return await this.db.genres.findOne({genreId:genreId})
  }

  delete=async(genreId='')=>{
    const op = new OperationResult('حذف ژانر')
    try {
        const filter = {genreId:genreId}
        const result = await this.db.genres.deleteOne(filter)
        if(result.deletedCount===0){
            return op.failed(`ژانر حذف نشد`,genreId)
        }
        return op.succeeded('ژانر باموفقیت حذف شد',genreId)
    } catch (error) {
        return op.failed(`حذف ژانر ناموفق :: ${error}`,genreId)
    }
  }

  hasGenreRelatedMoviesByThisId=async(genreId='')=>{
    return await this.db.movies.find({genreId:genreId})
  }

  get=async(genreId='')=>{
    return this.toAddEditModel(await this.db.genres.findOne({genreId:genreId}))
  }

  getAll=async()=>{
    return await this.db.genres.find({})
  }

  search=async(sm=GenreSearchModel.prototype)=>{
    try {
        let genres = this.db.genres.find({})
        if(sm.genreId.length>0){
            genres=genres.where('genreId').equals(sm.genreId)
        }
        if(sm.genreName.trim().length>0){
            genres=genres.where('genreName').equals({$regex:sm.genreName})
        }
        const q = genres.select(['genreId','genreName','description'])
        sm.documentCount = (await q).length
        const results = q.sort([['genreName','desc']])
        .skip(sm.pageSize*sm.pageIndex)
        .limit(sm.pageSize)
        .clone()

        const searchList = []

        ;(await results).forEach((item)=>{
            searchList.push(new GenreListItems({
                genreId:item.genreId,
                genreName:item.genreName,
                description:item.description
            }))
        })

        return searchList

    } catch (error) {
        throw new Error(error)
    }
  }
}

export default GenreRepository;
