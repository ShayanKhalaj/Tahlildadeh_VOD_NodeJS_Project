import PageModel from "../../common/PageModel.js";

class BoxSearchModel extends PageModel {
  boxId = "";
  title = "";
  description = "";
  constructor({ boxId = "", title = "", description = "" }) {
    super()
    this.boxId=boxId
    this.title=title
    this.description
  }
}


export default BoxSearchModel