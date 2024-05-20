import ActorRepository from "../../../data/repositories/ActorRepository.js";
import AuthorRepository from "../../../data/repositories/AuthorRepository.js";
import CategoryRepository from "../../../data/repositories/CategoryRepository.js";
import DirectorRepository from "../../../data/repositories/DirectorRepository.js";
import GenreRepository from "../../../data/repositories/GenreRepository.js";
import MovieRepository from "../../../data/repositories/MovieRepository.js";
import MusicianRepository from "../../../data/repositories/MusicianRepository.js";
import OperationResult from "../../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../../domain/context/TahlildadehVODDbContext.js";
import ActorMovieAddModel from "../../../domain/dto/movies/ActorMovieAddModel.js";
import MovieAddEditModel from "../../../domain/dto/movies/MovieAddEditModel.js";
import MovieSearchModel from "../../../domain/dto/movies/MovieSearchModel.js";
import InflateDropDown from "../../extensions/InflateDropDown.js";
import fs from 'fs'

class MovieController {
  repo = new MovieRepository();

  index = async (req, res) => {
    const searchList = await this.repo.search(new MovieSearchModel(req.query));
    return res.render("pannelLayout", {
      template: "pannel/movies/index",
      pageTitle: "مدیریت فیلم ها",
      movieSearchList: searchList,
      movies: await InflateDropDown.movies(),
      categories: await InflateDropDown.categories(),
      genres: await InflateDropDown.genres(),
      musicians: await InflateDropDown.musicians(),
      authors: await InflateDropDown.authors(),
    });
  };

  search=async(req,res)=>{
    const searchList = await this.repo.search(new MovieSearchModel({
      authorId:req.query.authorId,
      musicianId:req.query.musicianId,
      directorId:req.query.directorId,
      genreId:req.query.genreId,
      movieId:req.query.movieId,
      categoryId:req.query.categoryId,
      imdb:parseFloat(req.query.imdb),
      minAge:parseInt(req.query.minAge),
      movieName:req.query.movieName,
      hasSubText:req.query.hasSubText==='on'?true:false,
    }));
    return res.render('pannel/movies/grid',{
      movieSearchList: searchList,
    })
  }

  createModal = async (req, res) => {
    return res.render("pannel/movies/create", {
      directors: await InflateDropDown.directors(),
      categories: await InflateDropDown.categories(),
      genres: await InflateDropDown.genres(),
      musicians: await InflateDropDown.musicians(),
      authors: await InflateDropDown.authors(),
    });
  };

  create = async (req, res) => {
    console.log(req.body);
    const op = await this.repo.create(
      new MovieAddEditModel({
        authorId: req.body.authorId,
        musicianId: req.body.musicianId,
        categoryId: req.body.categoryId,
        directorId: req.body.directorId,
        genreId: req.body.genreId,
        coverImageAlter: req.body.coverImageAlter,
        coverImageUrl: req.file.filename,
        description: req.body.description,
        hasSubText: req.body.hasSubText==='on'?true:false,
        imdb: parseFloat(req.body.imdb),
        minAge: parseInt(req.body.minAge),
        movieName: req.body.movieName,
        movieVideoUrl: "",
        summary: req.body.summary,
        time: req.body.time,
        yearOfBuilt: parseInt(req.body.yearOfBuilt),
      })
    );
    if (op.success === true) {
      return res.redirect("/pannel/MovieManagement");
    } else {
      return res.json(op);
    }
  };

  createVideoModal = async (req, res) => {
    const movie = await this.repo.get(req.query.fieldId);
    return res.render("pannel/movies/video", {
      movie: movie,
    });
  };

  createVideo = async (req, res) => {
    const op = await this.repo.update(
      new MovieAddEditModel({
        movieId: req.body.movieId,
        authorId: req.body.authorId,
        musicianId: req.body.musicianId,
        categoryId: req.body.categoryId,
        directorId: req.body.directorId,
        genreId: req.body.genreId,
        coverImageAlter: req.body.coverImageAlter,
        coverImageUrl: req.body.coverImageUrl,
        description: req.body.description,
        hasSubText: Boolean(req.body.hasSubText),
        imdb: parseFloat(req.body.imdb),
        minAge: parseInt(req.body.minAge),
        movieName: req.body.movieName,
        movieVideoUrl: req.file.filename,
        summary: req.body.summary,
        time: req.body.time,
        yearOfBuilt: parseInt(req.body.yearOfBuilt),
      })
    );
    if(op.success===true){
        return res.redirect('/pannel/MovieManagement')
    }
    else{
        return res.json(op)
    }
  };

  delete=async(req,res)=>{
    const movie = await this.repo.get(req.body.movieId)
    const op = await this.repo.delete(req.body.movieId)
    if(op.success===false) return res.json(op)
    if(movie.coverImageUrl.length>0 && fs.existsSync(`ui/public/images/${movie.coverImageUrl}`)){
      fs.unlinkSync(`ui/public/images/${movie.coverImageUrl}`)
    }
    if(movie.movieVideoUrl.length>0 && fs.existsSync(`ui/public/videos/${movie.movieVideoUrl}`)){
      fs.unlinkSync(`ui/public/videos/${movie.movieVideoUrl}`)
    }
    return res.json(op)
  }

  createMovieActorsModal=async(req,res)=>{
    const actorRepo = new ActorRepository()
    const actors = await actorRepo.getAll()
    return res.render('pannel/movies/actors',{
      movieId:req.query.fieldId,
      actors:actors
    })
  }

  createActorMovie=async(req,res)=>{
    const actors = req.body.actors
    const actorMovies = []
    for(let actorId of actors){
      actorMovies.push(new ActorMovieAddModel({
        movieId:req.body.movieId,
        actorId:actorId
      }))
    }
    const op = await this.repo.createActorMovie(actorMovies)
    return res.json(op)
  }

  showDetails=async(req,res)=>{
    const db = new TahlildadehVODDbContext()
    const actorMovies = await db.actorMovies.find({movieId:req.query.movieId})
    const results = []
    for(let actor of actorMovies){
      const act = await db.actors.findOne({actorId:actor.actorId})
      results.push(act)
    }
    const movie=await this.repo.get(req.query.movieId)
    const catRepo = new CategoryRepository()
    const category=await catRepo.get(movie.categoryId)
    const genRepo = new GenreRepository()
    const genre=await genRepo.get(movie.genreId) 
    const authRepo = new AuthorRepository()
    const author=await authRepo.get(movie.authorId)
    const directorRepo = new DirectorRepository()
    const director=await directorRepo.get(movie.directorId)
    const muzRepo = new MusicianRepository()
    const musician=await muzRepo.get(movie.musicianId)
    return res.render('pannel/movies/details',{
      movie:movie,
      category:category,
      genre:genre,
      author:author,
      director:director,
      musician:musician,
      actors:results
    })
  }

  editMovieNameModal=async(req,res)=>{
    const movie = await this.repo.get(req.query.movieId)
    return res.render('pannel/movies/editMovieName',{
      movie:movie
    })
  }

  editMovieName=async(req,res)=>{
    const op = await this.repo.update(new MovieAddEditModel(req.body))
    return res.json(op)
  }

  deleteActor=async(req,res)=>{
    const db = new TahlildadehVODDbContext()
    const op = new OperationResult('حذف بازیگر مرتبط')
    const result = await db.actorMovies.deleteOne({actorId:req.body.actorId})
    if(result.deletedCount===0) return op.failed('بازیگر مرتبط حذف نشد',req.body.actorId)
    return res.json(op.succeeded('بازیگر مرتبط حذف شد',req.body.actorId))
  }


}

export default MovieController;
