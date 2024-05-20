import MusicianRepository from "../../../data/repositories/MusicianRepository.js";
import OperationResult from "../../../domain/common/OperationResult.js";
import MusicianAddEditModel from "../../../domain/dto/musicians/MusicianAddEditModel.js";
import MusicianSearchModel from "../../../domain/dto/musicians/MusicianSearchModel.js";
import AddMusicianValidationSchema from "../../../domain/validation/musicians/AddMusicianValidationSchema.js";

class MusicianController {
  index = async (req, res) => {
    const repo = new MusicianRepository();
    const searchResults = await repo.search(new MusicianSearchModel(req.query));
    return res.render("pannelLayout", {
      template: "pannel/musicians/index",
      pageTitle: "مدیریت آهنگسازان",
      musiciansSearchResults: searchResults,
      musicianDropDown: await this.infalteMusicianDropDown(),
    });
  };

  search = async (req, res) => {
    const repo = new MusicianRepository();
    const searchResults = await repo.search(new MusicianSearchModel(req.query));
    return res.render("pannel/musicians/grid", {
      musiciansSearchResults: searchResults,
    });
  };

  createModal = (req, res) => {
    return res.render("pannel/musicians/create");
  };

  create = async (req, res) => {
    const repo = new MusicianRepository();
    const operationResult = new OperationResult("ثبت آهنگساز");
    const {error,value} = AddMusicianValidationSchema.validate(req.body)
    if(error){
      let err = {}
      error.details.forEach((e)=>{
        err={
          validationResult:false,
          message:e.message,
          label:e.context.label
        }
      })
      return res.json(err)
    } 
    const hasDuplicated =
      await repo.hasMusicianDuplicatedMusicianByThisNameAndFamilyAndNation(
        req.body.name,
        req.body.family,
        req.body.nation
      );
    if (hasDuplicated.length > 0) {
      return res.json(
        operationResult.failed("آهنگساز با این مشخصات موجود است", null)
      );
    }
    return res.json(await repo.create(new MusicianAddEditModel(req.body)));
  };

  editModal = async (req, res) => {
    const repo = new MusicianRepository();
    const isExisted = await repo.isMusicianExistedByThisId(req.query.fieldId);
    if (isExisted.length === 0) {
      return res.json(
        new OperationResult("ویرایش آهنگساز").failed(
          "آهنگساز بااین شناسه موجود نیست",
          req.query.fieldId
        )
      );
    }
    const musician = await repo.get(req.query.fieldId)
    return res.render('pannel/musicians/edit',{
        musician:musician
    })
  };

  edit=async(req,res)=>{
    const repo = new MusicianRepository();
    const op = await repo.update(new MusicianAddEditModel(req.body))
    return res.json(op)
  }

  delete=async(req,res)=>{
    const repo = new MusicianRepository();
    const operationResult = new OperationResult("حذف آهنگساز");
    const hasRelated = await repo.hasMusicianRelatedMoviesByThisId(req.body.fieldId)
    if(hasRelated.length>0){
      return res.json(operationResult.failed('آهنگساز دارای فیلم های مرتبط است',null))
    }
    const op = await repo.delete(req.body.fieldId)
    return res.json(op)
  }

  infalteMusicianDropDown = async () => {
    const repo = new MusicianRepository();
    return await repo.getAll();
  };


}

export default MusicianController;
