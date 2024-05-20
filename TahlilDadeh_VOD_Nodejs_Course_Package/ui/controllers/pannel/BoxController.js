import BoxRepository from "../../../data/repositories/BoxRepository.js"
import OperationResult from "../../../domain/common/OperationResult.js"
import TahlildadehVODDbContext from "../../../domain/context/TahlildadehVODDbContext.js"
import BoxAddEditModel from "../../../domain/dto/boxes/BoxAddEditModel.js"
import BoxMovieAddModel from "../../../domain/dto/boxes/BoxMovieAddModel.js"
import BoxSearchModel from "../../../domain/dto/boxes/BoxSearchModel.js"
import InflateDropDown from "../../extensions/InflateDropDown.js"
import {BoxViewComponent} from '../../viewComponents/boxes/BoxViewComponent.js'

const repo = new BoxRepository()
const db = new TahlildadehVODDbContext()

class BoxController{
    index=async(req,res)=>{
        const sm = new BoxSearchModel(req.query)
        sm.pageIndex=parseInt(req.params.pageIndex)
        console.log(sm)
        if(sm.pageSize===0){
            sm.pageSize=20
        }
        const boxes = await BoxViewComponent.search(sm)
        return res.render('pannelLayout',{
            template:'pannel/boxes/index',
            pageTitle:'صفحه مدیریت جعبه ها',
            boxes:boxes,
            inflateBoxDropDown:await InflateDropDown.boxes(),
            sm:sm
        })
    }

    search=async(req,res)=>{
        const sm = new BoxSearchModel(req.query)
        if(sm.pageSize===0){
            sm.pageSize=20
        }
        const boxes = await BoxViewComponent.search(sm)
        return res.render('pannel/boxes/grid',{
            boxes:boxes,
            sm:sm
        })
    }

    createModal=async(req,res)=>{
        return res.render('pannel/boxes/create')
    }
    
    create=async(req,res)=>{
        const op = await repo.create(new BoxAddEditModel(req.body))
        return res.json(op)
    }

    editModal=async(req,res)=>{
        const box = await repo.get(req.query.fieldId)
        return res.render('pannel/boxes/edit',{
            box:box
        })
    }

    edit=async(req,res)=>{
        const op= await repo.update(new BoxAddEditModel(req.body))
        return res.json(op)
    }

    delete=async(req,res)=>{
        const op = await repo.delete(req.body.fieldId)
        return res.json(op)
    }

    createBoxMovieModal=async(req,res)=>{
        return res.render('pannel/boxes/boxMovie',{
            movies:await InflateDropDown.movies(),
            boxId:req.query.fieldId
        })
    }

    createBoxMovie=async(req,res)=>{
        const movies = req.body.movies
        const boxMovies = []
        for(let movieId of movies){
          boxMovies.push(new BoxMovieAddModel({
            boxId:req.body.boxId,
            movieId:movieId
          }))
        }
        const op = await repo.createBoxMovie(boxMovies)
        return res.json(op)
    }

    showRelatedMovies=async(req,res)=>{
        const boxMovies = await db.boxMovies.find({boxId:req.query.boxId})
        const results = []
        for(let boxMovie of boxMovies){
          const movie = await db.movies.findOne({movieId:boxMovie.movieId})
          results.push(movie)
        }
        return res.render('pannel/boxes/boxMovieDetails',{
          movies:results,
          boxId:req.query.boxId
        })
    }

    deleteBoxMovie=async(req,res)=>{
        const op = new OperationResult('حذف فیلم مرتبط با جعبه')
        const result = await db.boxMovies.deleteOne({movieId:req.body.movieId})
        if(result.deletedCount===0) return op.failed('فیلم مرتبط حذف نشد',req.body.movieId)
        return res.json(op.succeeded('فیلم مرتبط حذف شد',req.body.movieId))
    }
}

export default BoxController