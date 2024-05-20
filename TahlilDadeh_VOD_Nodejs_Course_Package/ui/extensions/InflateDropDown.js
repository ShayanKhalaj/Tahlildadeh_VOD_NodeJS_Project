import ActorRepository from "../../data/repositories/ActorRepository.js"
import AuthorRepository from "../../data/repositories/AuthorRepository.js"
import BoxRepository from "../../data/repositories/BoxRepository.js"
import CategoryRepository from "../../data/repositories/CategoryRepository.js"
import DirectorRepository from "../../data/repositories/DirectorRepository.js"
import GenreRepository from "../../data/repositories/GenreRepository.js"
import MovieRepository from "../../data/repositories/MovieRepository.js"
import MusicianRepository from "../../data/repositories/MusicianRepository.js"

class InflateDropDown{
    static boxes=async()=>{
        const repo=new BoxRepository()
        return await repo.getAll()
    }
    static categories=async()=>{
        const repo = new CategoryRepository()
        return await repo.getAll()
    }
    static actors=async()=>{
        const repo = new ActorRepository()
        return await repo.getAll()
    }
    static genres=async()=>{
        const repo = new GenreRepository()
        return await repo.getAll()
    }
    static directors=async()=>{
        const repo = new DirectorRepository()
        return await repo.getAll()
    }
    static authors=async()=>{
        const repo = new AuthorRepository()
        return await repo.getAll()
    }
    static musicians=async()=>{
        const repo = new MusicianRepository()
        return await repo.getAll()
    }
    static movies=async()=>{
        const repo = new MovieRepository()
        return await repo.getAll()
    }
}

export default InflateDropDown