import GenreRepository from "../../../data/repositories/GenreRepository.js"
import OperationResult from "../../../domain/common/OperationResult.js"
import ValidationResult from "../../../domain/common/ValidationResult.js"
import GenreAddEditModel from "../../../domain/dto/genres/GenreAddEditModel.js"
import GenreSearchModel from "../../../domain/dto/genres/GenreSearchModel.js"
import AddGenreValidationSchema from "../../../domain/validation/genres/AddGenreValidationSchema.js"
import EditGenreValidationSchema from "../../../domain/validation/genres/EditGenreValidationSchema.js"

class GenreController{
    repo = new GenreRepository()
    index=async(req,res)=>{
        const searchResult = await this.repo.search(new GenreSearchModel(req.query))
        return res.render('pannelLayout',{
            template:'pannel/genres/index',
            pageTitle:'مدیریت ژانرها',
            genreSearchList:searchResult,
            selectGenres:await this.inflateGenreDropDown()
        })
    }

    search=async(req,res)=>{
        const searchResult = await this.repo.search(new GenreSearchModel(req.query))
        return res.render('pannel/genres/grid',{
            genreSearchList:searchResult,
        })
    }

    createModal=(req,res)=>{
        return res.render('pannel/genres/create')
    }

    create=async(req,res)=>{
        const {error,value} = AddGenreValidationSchema.validate(req.body)
        if(error){
            const err = ValidationResult.invoke(error)
            return res.json(err)
        }
        const hasDuplicated = await this.repo.hasGenreDuplicatedGenreByThisGenreName(req.body.genreName)
        if(hasDuplicated.length>0){
            const operationResult=new OperationResult('ثبت ژانر')
            return res.json(operationResult.failed('ژانر با این نام موجود است',null))
        }
        const op = await this.repo.create(new GenreAddEditModel(value))
        return res.json(op)
    }

    editModal=async(req,res)=>{
        const isExisted = await this.repo.isGenreExistedByThisId(req.query.fieldId)
        if(isExisted.length===0){
            const op = new OperationResult('ویرایش ژانر')
            return res.json(op.failed('ژانر با این شناسه یافت نشد',null))
        }
        const genre = await this.repo.get(req.query.fieldId)
        return res.render('pannel/genres/edit',{
            genre:genre
        })
    }

    edit=async(req,res)=>{
        console.log(req.body)
        const {error,value} = EditGenreValidationSchema.validate(req.body)
        if(error){
            const err=ValidationResult.invoke(error)
            return res.json(err)
        }
        const op = await this.repo.update(new GenreAddEditModel(value))
        return res.json(op)
    }

    delete=async(req,res)=>{
        const hasRelated = await this.repo.hasGenreRelatedMoviesByThisId(req.body.fieldId)
        if(hasRelated.length>0){
            return res.json(new OperationResult('حذف ژانر').failed('ژانر دارای فیلم زیر مجموعه است',null))
        }
        const op = await this.repo.delete(req.body.fieldId)
        return res.json(op)
    }

    inflateGenreDropDown=async()=>{
        return await this.repo.getAll()
    }
}

export default GenreController