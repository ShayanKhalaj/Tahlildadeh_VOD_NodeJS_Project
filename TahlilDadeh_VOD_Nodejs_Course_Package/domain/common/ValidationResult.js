// ES6

class ValidationResult {
  static invoke = (error) => {
    let err = {}
    error.details.forEach((e)=>{
        err={
            validationResult:false,
            message:e.message,
            label:e.context.label
        }
    })
    return err
  };
}

export default ValidationResult;
