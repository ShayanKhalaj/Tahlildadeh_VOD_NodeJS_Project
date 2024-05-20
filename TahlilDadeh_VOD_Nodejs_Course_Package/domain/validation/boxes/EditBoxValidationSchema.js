import Joi from 'joi'

const EditBoxValidationSchema = Joi.object({
    boxId:Joi.string().required().empty().max(100).message('*'),
    title: Joi.string().alphanum().required().empty().max(100).message("*"),
    description: Joi.string().alphanum().max(200).message("*"),
})

export default EditBoxValidationSchema