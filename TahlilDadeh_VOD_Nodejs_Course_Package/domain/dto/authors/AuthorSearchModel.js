import PageModel from "../../common/PageModel.js";

class AuthorSearchModel extends PageModel {
  authorId = "";
  name = "";
  family = "";
  constructor({ authorId = "", name = "", family = "" }) {
    super()
    this.authorId=authorId
    this.name=name
    this.family=family
  }
}

export default AuthorSearchModel
