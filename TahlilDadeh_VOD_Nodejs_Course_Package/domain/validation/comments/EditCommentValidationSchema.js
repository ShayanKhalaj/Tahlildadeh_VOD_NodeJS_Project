import Joi from 'joi'

const EditCommentValidationSchema= Joi.object({
    commentId:Joi.string().required().empty().message('*'),
    text:Joi.string().alphanum().required().empty().max(200).message('*'),
    isAccepted:Joi.boolean().message("*"),
    answer:Joi.string().alphanum().max(500).message('*'),
    movieId:Joi.string().required().empty().message('*')
})

export default EditCommentValidationSchema