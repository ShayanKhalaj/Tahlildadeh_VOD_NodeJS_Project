class OperationResult {
  operationName = "";
  operationDate = new Date();
  documentId = "";
  success = false;
  message = "";
  constructor(operationName = "") {
    this.operationName = operationName;
    this.operationDate = new Date();
  }
  succeeded = (message = "", documentId) => {
    this.message = message;
    this.success = true;
    if(documentId!==undefined || documentId!==null){
        this.documentId=documentId
    }
    return this
  };
  failed = (message = "", documentId) => {
    this.message = message;
    this.success = false;
    if(documentId!==undefined || documentId!==null){
        this.documentId=documentId
    }
    return this
  };
}


export default OperationResult;
