import Joi from 'joi'

const EditGenreValidationSchema = Joi.object({
    genreId:Joi.string().allow(''),
    genreName:Joi.string().required().empty().max(50).message('*'),
    description:Joi.string().allow('').max(200).message('*')
})

export default EditGenreValidationSchema