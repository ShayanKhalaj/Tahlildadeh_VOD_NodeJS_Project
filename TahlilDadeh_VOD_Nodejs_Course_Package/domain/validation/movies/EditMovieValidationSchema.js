import Joi from 'joi'

const EditMovieValidationSchema = Joi.object({
    movieId:Joi.string().required().empty().message('*'),
    movieName: Joi.string().alphanum().required().empty().max(100).message("*"),
    coverImageUrl: Joi.string().max(2000).message("*"),
    coverImageAlter: Joi.string().alphanum().max(200).message("*"),
    movieVideoUrl: Joi.string().max(2000).message("*"),
    description: Joi.string().alphanum().max(200).message("*"),
    summary: Joi.string().alphanum().max(400).message("*"),
    time: Joi.string().max(12).message("*"),
    minAge: Joi.number().message("*"),
    yearOfBuilt: Joi.number().message("*"),
    imdb: Joi.number().message("*"),
    hasSubText: Joi.boolean().message("*"),
    categoryId: Joi.string().required().empty().message("*"),
    genreId: Joi.string().message("*"),
    musicianId: Joi.string().message("*"),
    authorId: Joi.string().message("*"),
})


export default EditMovieValidationSchema