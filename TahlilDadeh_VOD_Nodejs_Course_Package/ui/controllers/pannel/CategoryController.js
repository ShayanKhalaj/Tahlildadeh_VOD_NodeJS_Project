import CategoryRepository from "../../../data/repositories/CategoryRepository.js";
import CategoryAddEditModel from "../../../domain/dto/categories/CategoryAddEditModel.js";
import CategorySearchModel from "../../../domain/dto/categories/CategorySearchModel.js";
import fs from "fs";

class CategoryController {
  repo = new CategoryRepository();
  index = async (req, res) => {
    const searchResults = await this.repo.search(
      new CategorySearchModel(req.query)
    );
    const selectCategories = await this.inflateCategoryDropDown();
    return res.render("pannelLayout", {
      template: "pannel/categories/index",
      pageTitle: "مدیریت دسته بندی ها",
      searchResults: searchResults,
      selectCategories: selectCategories,
    });
  };

  search = async (req, res) => {
    const searchResults = await this.repo.search(
      new CategorySearchModel(req.query)
    );
    return res.render("pannel/categories/grid", {
      searchResults: searchResults,
    });
  };

  createModal = (req, res) => {
    return res.render("pannel/categories/create");
  };

  create = async (req, res) => {
    const categoryEditModel = new CategoryAddEditModel({
      categoryName: req.body.categoryName,
      categoryImageAlter: req.body.categoryImageAlter,
      description: req.body.description,
      categoryImageUrl: req.file.filename,
    });
    const op = this.repo.create(categoryEditModel);
    if (op.success === false) return res.json(op);
    else return res.redirect("/pannel/CategoryManagement");
  };

  editModal = async (req, res) => {
    const category = await this.repo.get(req.query.fieldId);
    return res.render("pannel/categories/edit", {
      category: category,
    });
  };

  edit = async (req, res) => {
    const op = await this.repo.update(new CategoryAddEditModel(req.body));
    if (op.success === false) return res.json(op);
    return res.redirect("/pannel/CategoryManagement");
  };

  editImageModal = async (req, res) => {
    const category = await this.repo.get(req.query.fieldId);
    return res.render("pannel/categories/editImage", {
      category: category,
    });
  };

  editImage = async (req, res) => {
    try {
      const category = await this.repo.get(req.body.categoryId);
      fs.unlinkSync(`ui/public/images/${category.categoryImageUrl}`);
      const op = await this.repo.update(
        new CategoryAddEditModel({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          categoryImageAlter: category.categoryImageAlter,
          description: category.description,
          categoryImageUrl: req.file.filename,
        })
      );
      if (op.success === true) {
        return res.redirect("/pannel/CategoryManagement");
      } else {
        return res.json(op);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (req, res) => {
    try {
      const category = await this.repo.get(req.body.fieldId);
      const op = await this.repo.delete(category.categoryId);
      if (op.success === true) {
        fs.unlinkSync(`ui/public/images/${category.categoryImageUrl}`);
      }
      return res.json(op);
    } catch (error) {
      throw new Error(error);
    }
  };

  inflateCategoryDropDown = async () => {
    return await this.repo.getAll();
  };
}

export default CategoryController;
