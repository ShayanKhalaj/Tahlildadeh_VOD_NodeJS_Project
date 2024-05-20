class CategoryAddEditModel {
  categoryId = "";
  categoryName = "";
  description = "";
  categoryImageUrl = "";
  categoryImageAlter = "";
  constructor({
    categoryId = "",
    categoryName = "",
    description = "",
    categoryImageUrl = "",
    categoryImageAlter = "",
  }) {
    this.categoryId=categoryId
    this.categoryName=categoryName
    this.description=description
    this.categoryImageUrl=categoryImageUrl
    this.categoryImageAlter=categoryImageAlter
  }
}

export default CategoryAddEditModel
