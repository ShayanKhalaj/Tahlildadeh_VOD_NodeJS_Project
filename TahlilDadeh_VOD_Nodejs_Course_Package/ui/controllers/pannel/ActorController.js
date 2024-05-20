import ActorRepository from "../../../data/repositories/ActorRepository.js"
import ActorAddEditModel from "../../../domain/dto/actors/ActorAddEditModel.js"
import ActorSearchModel from "../../../domain/dto/actors/ActorSearchModel.js"

class ActorController{
    index=async(req,res)=>{
        const repo = new ActorRepository()
        const actors = await repo.getAll()
        return res.render('pannelLayout',{
            pageTitle:'مدیریت بازیگران',
            template:'pannel/actors/index',
            grid:'pannel/actors/grid',
            selectActors:actors,
            actorsResults:actors
        })
    }

    search=async(req,res)=>{
        console.log(req.query)
        const repo=new ActorRepository()
        const sm = new ActorSearchModel(req.query)
        const searchResult = await repo.search(sm)
        return res.render('pannel/actors/grid',{
            actorsResults:searchResult
        })
    }

    createModal=(req,res)=>{
        return res.render('pannel/actors/create')
    }

    create=async(req,res)=>{
        const repo = new ActorRepository()
        const model = new ActorAddEditModel(req.body)
        const op = await repo.create(model)
        return res.json(op)
    }

    editModal=async(req,res)=>{
        const repo = new ActorRepository()
        const actor = await repo.get(req.query.actorId)
        return res.render('pannel/actors/edit',{
            actor:actor
        })
    }

    edit=async(req,res)=>{
        const repo = new ActorRepository()
        const model = new ActorAddEditModel(req.body)
        const op = await repo.update(model)
        return res.json(op)
    }

    delete=async(req,res)=>{
        const repo = new ActorRepository()
        const op = await repo.delete(req.body.actorId)
        return res.json(op)
    }
}

export default ActorController