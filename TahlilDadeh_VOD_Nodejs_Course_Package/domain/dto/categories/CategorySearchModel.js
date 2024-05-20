import PageModel from "../../common/PageModel.js";

class CategorySearchModel extends PageModel{
    categoryId=''
    categoryName=''
    constructor({categoryId='',categoryName=''}){
        super()
        this.categoryId=categoryId
        this.categoryName=categoryName
    }
}

export default CategorySearchModel