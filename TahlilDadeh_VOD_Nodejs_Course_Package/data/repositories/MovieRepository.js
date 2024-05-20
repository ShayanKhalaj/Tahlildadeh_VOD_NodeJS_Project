import OperationResult from "../../domain/common/OperationResult.js";
import TahlildadehVODDbContext from "../../domain/context/TahlildadehVODDbContext.js";
import ActorMovieAddModel from "../../domain/dto/movies/ActorMovieAddModel.js";
import MovieAddEditModel from "../../domain/dto/movies/MovieAddEditModel.js";
import MovieListItems from "../../domain/dto/movies/MovieListItems.js";
import MovieSearchModel from "../../domain/dto/movies/MovieSearchModel.js";
import MovieSchema from "../../domain/schema/MovieSchema.js";

class MovieRepository {
  db = new TahlildadehVODDbContext();

  toCreateModel = (m = MovieAddEditModel.prototype) => {
    return {
      movieName: m.movieName,
      coverImageUrl: m.coverImageUrl,
      coverImageAlter: m.coverImageAlter,
      movieVideoUrl: m.movieVideoUrl,
      description: m.description,
      summary: m.summary,
      time: m.time,
      minAge: m.minAge,
      yearOfBuilt: m.yearOfBuilt,
      imdb: m.imdb,
      hasSubText: m.hasSubText,
      categoryId: m.categoryId,
      genreId: m.genreId,
      musicianId: m.musicianId,
      authorId: m.authorId,
      directorId: m.directorId,
    };
  };

  toEditModel = (m = MovieAddEditModel.prototype) => {
    return {
      movieId: m.movieId,
      movieName: m.movieName,
      coverImageUrl: m.coverImageUrl,
      coverImageAlter: m.coverImageAlter,
      movieVideoUrl: m.movieVideoUrl,
      description: m.description,
      summary: m.summary,
      time: m.time,
      minAge: m.minAge,
      yearOfBuilt: m.yearOfBuilt,
      imdb: m.imdb,
      hasSubText: m.hasSubText,
      categoryId: m.categoryId,
      genreId: m.genreId,
      musicianId: m.musicianId,
      authorId: m.authorId,
      directorId: m.directorId,
    };
  };

  toMovieAddEditModel = (m = MovieSchema) => {
    return new MovieAddEditModel({
      movieId: m.movieId,
      movieName: m.movieName,
      coverImageUrl: m.coverImageUrl,
      coverImageAlter: m.coverImageAlter,
      movieVideoUrl: m.movieVideoUrl,
      description: m.description,
      summary: m.summary,
      time: m.time,
      minAge: m.minAge,
      yearOfBuilt: m.yearOfBuilt,
      imdb: m.imdb,
      hasSubText: m.hasSubText,
      categoryId: m.categoryId,
      genreId: m.genreId,
      musicianId: m.musicianId,
      authorId: m.authorId,
      directorId: m.directorId,
    });
  };

  create = async (model = MovieAddEditModel.prototype) => {
    const op = new OperationResult("ثبت فیلم");
    try {
      const result = await this.db.movies.create(this.toCreateModel(model));
      return op.succeeded("فیلم با موفقیت ثبت شد", result.movieId);
    } catch (error) {
      return op.failed("ثبت فیلم ناموفق", null);
    }
  };

  update = async (model = MovieAddEditModel.prototype) => {
    const op = new OperationResult("ویرایش فیلم");
    try {
      const result = await this.db.movies.updateOne(
        { movieId: model.movieId },
        { $set: this.toEditModel(model) }
      );
      if (result.modifiedCount === 0) {
        return op.failed("فیلم ویرایش نشد", model.movieId);
      }
      return op.succeeded("فیلم با موفقیت ویرایش شد", model.movieId);
    } catch (error) {
      return op.failed("ویرایش فیلم ناموفق", model.movieId);
    }
  };

  delete = async (movieId = "") => {
    const op = new OperationResult("حذف فیلم");
    try {
      const result = await this.db.movies.deleteOne({ movieId: movieId });
      if (result.deletedCount === 0) {
        return op.failed("فیلم حذف نشد", movieId);
      }
      const deleteRelationResult = await this.db.actorMovies.deleteMany({movieId:movieId})
      if(deleteRelationResult.deletedCount===0){
        return op.succeeded(" فیلم با موفقیت حذف شد اما بازیگران مرتبط حذف نشدند", movieId);
      }
      return op.succeeded("فیلم با موفقیت حذف شد", movieId);
    } catch (error) {
      return op.failed("حذف فیلم ناموفق", movieId);
    }
  };

  get = async (movieId = "") => {
    return this.toMovieAddEditModel(
      await this.db.movies.findOne({ movieId: movieId })
    );
  };

  getAll = async () => {
    return await this.db.movies.find({});
  };

  search = async (sm = MovieSearchModel.prototype) => {
    try {
      let movies = this.db.movies.find({});
      if (sm.movieId.length > 0) {
        movies = movies.where("movieId").equals(sm.movieId);
      }
      if (sm.directorId.length > 0) {
        movies = movies.where("directorId").equals(sm.directorId);
      }
      if (sm.musicianId.length > 0) {
        movies = movies.where("musicianId").equals(sm.musicianId);
      }
      if (sm.authorId.length > 0) {
        movies = movies.where("authorId").equals(sm.authorId);
      }
      if (sm.genreId.length > 0) {
        movies = movies.where("genreId").equals(sm.genreId);
      }
      if (sm.categoryId.length > 0) {
        movies = movies.where("categoryId").equals(sm.categoryId);
      }
      if (sm.movieName.length > 0) {
        movies = movies.where("movieName").equals({ $regex: sm.movieName });
      }
      if (sm.minAge > 0) {
        movies = movies.where("minAge").gte(sm.minAge);
      }
      if (sm.imdb > 0) {
        movies = movies.where("imdb").gte(sm.imdb);
      }
      if (sm.hasSubText === true) {
        movies = movies.where("hasSubText").equals(true);
      }
      const q = movies.select([
        "movieId",
        "movieName",
        "coverImageUrl",
        "coverImageAlter",
        "movieVideoUrl",
        "description",
        "summary",
        "time",
        "minAg",
        "yearOfBuil",
        "imd",
        "hasSubText",
        "categoryId",
        "genreId",
        "musicianId",
        "authorId",
        "directorId",
      ]);
      sm.documentCount = (await q).length;
      const result = q
        .sort([["movieName", "desc"]])
        .skip(sm.pageSize * sm.pageIndex)
        .limit(sm.pageSize)
        .clone();
        const searchList = []
        ;(await result).forEach((m)=>{
            searchList.push(new MovieListItems({
                authorId:m.authorId,
                categoryId:m.categoryId,
                coverImageAlter:m.coverImageAlter,
                coverImageUrl:m.coverImageUrl,
                description:m.description,
                genreId:m.genreId,
                hasSubText:m.hasSubText,
                imdb:m.imdb,
                minAge:m.minAge,
                movieId:m.movieId,
                movieName:m.movieName,
                movieVideoUrl:m.movieVideoUrl,
                musicianId:m.musicianId,
                summary:m.summary,
                time:m.time,
                yearOfBuilt:m.yearOfBuilt
            }))
        })

        return searchList
    } catch (error) {
      throw new Error(error);
    }
  };

  createActorMovie=async(model=[ActorMovieAddModel.prototype])=>{
    const op = new OperationResult('ثبت بازیگران')
    try {
        await this.db.actorMovies.insertMany(model)
        // result.save()
        return op.succeeded('بازیگران ثبت شدند',null)
    } catch (error) {
        return op.failed('ثبت بازیگران ناموفق',null)
    }
  }

  deleteActorMovie=async(actorId='')=>{
    const op = new OperationResult('ثبت بازیگر')
    try {
        const result = await this.db.actorMovies.deleteOne({actorId:actorId})
        if(result.deletedCount===0){
            return op.failed('حذف رابطه بازیگر و فیلم ناموفق',actorId)
        }
        return op.succeeded('حذف رابطه بازیگر و فیلم انجام شد',actorId)
    } catch (error) {
        return op.failed('حذف رابطه بازیگر و فیلم ناموفق',actorId)
    }
  }
}

export default MovieRepository;
