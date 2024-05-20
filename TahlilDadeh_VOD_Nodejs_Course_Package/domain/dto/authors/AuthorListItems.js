class AuthorListItems {
  authorId = "";
  name = "";
  family = "";
  nation = "";
  constructor({ authorId = "", name = "", family = "", nation = "" }) {
    this.authorId=authorId
    this.name=name
    this.family=family
    this.nation=nation
  }
}

export default AuthorListItems
