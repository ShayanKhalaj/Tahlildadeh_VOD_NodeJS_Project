import DirectorRepository from "../../../data/repositories/DirectorRepository.js";
import OperationResult from "../../../domain/common/OperationResult.js";
import DirectorAddEditModel from "../../../domain/dto/directors/DirectorAddEditModel.js";
import DirectorSearchModel from "../../../domain/dto/directors/DirectorSearchModel.js";

class DirectorController {
  index = async (req, res) => {
    const repo = new DirectorRepository();
    const sm = new DirectorSearchModel(req.query);
    const searchList = await repo.search(sm);
    return res.render("pannelLayout", {
      template: "pannel/directors/index",
      pageTitle: "مدیریت کارگردانان",
      searchDirectors: searchList,
      selectDirectors: await this.inflateDirectorDropDown(),
    });
  };

  search = async (req, res) => {
    const repo = new DirectorRepository();
    const sm = new DirectorSearchModel(req.query);
    const searchList = await repo.search(sm);
    return res.render("pannel/directors/grid", {
      searchDirectors: searchList,
    });
  };

  createModal = (req, res) => {
    return res.render("pannel/directors/create");
  };

  create = async (req, res) => {
    const repo = new DirectorRepository();
    const operationResult = new OperationResult("ثبت کارگردان");
    const hasDuplicated =
      await repo.hasDirectorDuplicatedDirectorByThisNameAndFamilyAndNation(
        req.body.name,
        req.body.family,
        req.body.nation
      );
    if (hasDuplicated.length > 0) {
      const result = operationResult.failed(
        "کارگردان با این مشخصات موجود است",
        null
      );
      return res.json(result);
    }
    const op = await repo.create(new DirectorAddEditModel(req.body));
    return res.json(op);
  };

  editModal = async (req, res) => {
    const repo = new DirectorRepository();
    const isExited = await repo.isExistedDirectorByThisId(req.query.fieldId);

    if(!isExited.length>0){
      const op = new OperationResult('ویرایش کارگردان')
        return res.json(op.failed('کارگردان با این مشخصات موجود',null))
    }

    const director = await repo.get(req.query.fieldId);
    return res.render("pannel/directors/edit", {
      director: director,
    });
  };

  edit = async (req, res) => {
    const repo = new DirectorRepository();
    const op = await repo.update(new DirectorAddEditModel(req.body));
    return res.json(op);
  };

  delete=async(req,res)=>{
    const repo = new DirectorRepository();
    const op = await repo.delete(req.body.fieldId)
    return res.json(op)
  }

  inflateDirectorDropDown = async () => {
    const repo = new DirectorRepository();
    return await repo.getAll();
  };
}

export default DirectorController;
