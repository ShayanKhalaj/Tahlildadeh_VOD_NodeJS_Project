import mongoose from "mongoose"
import ActorMovieSchema from "../schema/ActorMovieSchema.js"
import ActorSchema from "../schema/ActorSchema.js"
import AuthorSchema from "../schema/AuthorSchema.js"
import BoxMovieSchema from "../schema/BoxMovieSchema.js"
import BoxSchema from "../schema/BoxSchema.js"
import CategorySchema from "../schema/CategorySchema.js"
import CommentSchema from "../schema/CommentSchema.js"
import DirectorSchema from "../schema/DirectorSchema.js"
import GenreSchema from "../schema/GenreSchema.js"
import MovieSchema from "../schema/MovieSchema.js"
import MusicianSchema from "../schema/MusicianSchema.js"

class TahlildadehVODDbContext{
    constructor(){        
        this.actorMovies = mongoose.model('actorMovies',ActorMovieSchema)
        this.actors = mongoose.model('actors',ActorSchema)
        this.authors = mongoose.model('authors',AuthorSchema)
        this.boxMovies = mongoose.model('boxMovies',BoxMovieSchema)
        this.boxes = mongoose.model('boxes',BoxSchema)
        this.categories = mongoose.model('categories',CategorySchema)
        this.comments = mongoose.model('comments',CommentSchema)
        this.directors = mongoose.model('directors',DirectorSchema)
        this.genres = mongoose.model('genres',GenreSchema)
        this.movies = mongoose.model('movies',MovieSchema)
        this.musicians = mongoose.model('musicians',MusicianSchema)
    }
}

export default TahlildadehVODDbContext
