import Joi from 'joi'

const AddCommentValidationSchema = Joi.object({
        text:Joi.string().alphanum().required().empty().max(200).message('*'),
        isAccepted:Joi.boolean().message("*"),
        answer:Joi.string().alphanum().max(500).message('*'),
        movieId:Joi.string().required().empty().message('*')
})

export default AddCommentValidationSchema