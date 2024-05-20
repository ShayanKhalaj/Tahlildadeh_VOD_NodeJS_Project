import AuthorRepository from "../../../data/repositories/AuthorRepository.js"
import AuthorAddEditModel from "../../../domain/dto/authors/AuthorAddEditModel.js"
import AuthorSearchModel from "../../../domain/dto/authors/AuthorSearchModel.js"

class AuthorController{
    index=async(req,res)=>{
        const repo = new AuthorRepository()
        const authors = await repo.getAll()
        return res.render('pannelLayout',{
            template:'pannel/authors/index',
            pageTitle:'مدیریت نویسندگان',
            selectAuthors:authors,
            authorResults:authors
        })
    } 

    createModal=(req,res)=>{
        return res.render('pannel/authors/create')
    }
    
    create=async(req,res)=>{
        const repo = new AuthorRepository()
        const model = new AuthorAddEditModel(req.body)
        const op = await repo.create(model)
        return res.json(op)
    }

    search=async(req,res)=>{
        const repo = new AuthorRepository()
        const sm = new AuthorSearchModel(req.query)
        const searchResults = await repo.search(sm)
        return res.render('pannel/authors/grid',{
            authorResults:searchResults
        })
    }

    editModal=async(req,res)=>{
        const repo = new AuthorRepository()
        const author = await repo.get(req.query.authorId)
        return res.render('pannel/authors/edit',{author:author})
    }

    edit=async(req,res)=>{
        const repo = new AuthorRepository()
        const model = new AuthorAddEditModel(req.body)
        const op = await repo.update(model)
        return res.json(op)
    }

    delete=async(req,res)=>{
        const repo = new AuthorRepository()
        const op = await repo.delete(req.body.authorId)
        return res.json(op)
    }
}

export default AuthorController