import OperationResult from "../../domain/common/OperationResult.js"
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js"
import BoxAddEditModel from "../../domain/dto/boxes/BoxAddEditModel.js"
import BoxListItems from "../../domain/dto/boxes/BoxListItems.js"
import BoxMovieAddModel from "../../domain/dto/boxes/BoxMovieAddModel.js"
import BoxSearchModel from "../../domain/dto/boxes/BoxSearchModel.js"
import BoxSchema from "../../domain/schema/BoxSchema.js"

const db = new TahlildadehVODDbContext()

const toCreateModel=(model=BoxAddEditModel.prototype)=>{
    return {
        title : model.title,
        description :model.description
    }
}

const toEditModel=(model=BoxAddEditModel.prototype)=>{
    return {
        boxId:model.boxId,
        title : model.title,
        description :model.description
    }
}

const toAddEditModel=(model=BoxSchema)=>{
    return new BoxAddEditModel({
        boxId:model.boxId,
        title : model.title,
        description :model.description
    })
}

class BoxRepository{
    create=async(model=BoxAddEditModel.prototype)=>{
        const op = new OperationResult('ثبت جعبه')
        try {
            const result = await db.boxes.create(toCreateModel(model))
            return op.succeeded('جعبه ثبت شد',result.boxId)
        } catch (error) {
            return op.failed('جعبه ثب نشد'+error,null)
        }
    }

    createBoxMovie=async(model=[BoxMovieAddModel.prototype])=>{
        const op=new OperationResult('ثبت فیلم های مرتبط با این جعبه')
        try {
            await db.boxMovies.insertMany(model)
            return op.succeeded('ثبت فیلم های مرتبط با موفقیت انجام شد',null)
        } catch (error) {
            return op.failed('ثبت فیلم های مرتبط ناموفق',null)
        }
    }

    update=async(model=BoxAddEditModel.prototype)=>{
        const op=new OperationResult('ویرایش جعبه')
        try {
            const result = await db.boxes.updateOne({boxId:model.boxId},{$set:toEditModel(model)})
            if(result.modifiedCount===0){
                return op.failed('ویرایش ناموفق',model.boxId)
            }
            return op.succeeded('ویرایش جعبه با موفقیت انجام شد',model.boxId)
        } catch (error) {
            return op.failed('ویرایش جعبه ماموفق',model.boxId)
        }
    }

    delete=async(boxId='')=>{
        const op=new OperationResult('حذف جعبه')
        try {
            const result = await db.boxes.deleteOne({boxId:boxId})
            if(result.deletedCount===0){
                return op.failed('حذف ناموفق',boxId)
            }
            const deleteRelatedMovies =await db.boxMovies.deleteMany({boxId:boxId})
            if(deleteRelatedMovies.deletedCount===0){
                return op.succeeded('جعبه حذف شد اما فیلم های مرتبط حذف نشد',boxId)
            }
            return op.succeeded('حذف جعبه با موفقیت انجام شد',boxId)
        } catch (error) {
            return op.failed('حذف جعبه ماموفق',boxId)
        }
    }

    deleteBoxMovies=async(boxId='')=>{
        const op = new OperationResult('حذف فیلم ها')
        try {
            const result = await db.boxMovies.deleteOne({boxId:boxId})
            if(result.deletedCount===0){
                return op.failed('حذف رابطه جعبه و فیلم ناموفق',boxId)
            }
            return op.succeeded('حذف رابطه جعبه و فیلم انجام شد',boxId)
        } catch (error) {
            return op.failed('حذف رابطه جعبه و فیلم ناموفق',boxId)
        }
      }

      get = async (boxId = "") => {
        return toAddEditModel(
          await db.boxes.findOne({ boxId: boxId })
        );
      };
    
      getAll = async () => {
        return await db.boxes.find({});
      };

      search = async (sm = BoxSearchModel.prototype) => {
        try {
          let boxes = db.boxes.find({});
          if (sm.boxId.length > 0) {
            boxes = boxes.where("boxId").equals(sm.boxId);
          }
          if (sm.title.trim().length > 0) {
            boxes = boxes.where("title").equals({ $regex: sm.title });
          }
          if (sm.description.trim().length > 0) {
            boxes = boxes.where("description").equals({ $regex: sm.description });
          }
          const q = boxes.select([
            "boxId",
            "title",
            "description"
          ]);
          sm.documentCount = (await q).length;
          const result = q
            .sort([["title", "desc"]])
            .skip(sm.pageSize * sm.pageIndex)
            .limit(sm.pageSize)
            .clone();
            const searchList = []
            ;(await result).forEach((m)=>{
                searchList.push(new BoxListItems({
                    boxId:m.boxId,
                    title:m.title,
                    description:m.description
                }))
            })
    
            return searchList
        } catch (error) {
          throw new Error(error);
        }
      };
}


export default BoxRepository