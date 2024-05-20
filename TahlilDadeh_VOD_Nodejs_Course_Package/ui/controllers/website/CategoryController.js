import TahlildadehVODDbContext from "../../../domain/context/TahlildadehVODDbContext.js";

const db = new TahlildadehVODDbContext()

const index=async(req,res)=>{
    const categories = await db.categories.find({})
    return res.render("websiteLayout", {
        template: "website/show-category",
        pageTitle: "دسته بندی ها",
        name:req.session.name,
        family:req.session.family,
      categories:categories
      });
}

const getCategoryMovies = async(req,res)=>{
    const movies = await db.movies.aggregate([
        {
            $match:{categoryId:req.params.categoryId}
        }
        ,{
            $lookup:{
                from:'categoreis',
                localField:'categoryId',
                foreignField:'categoryId',
                as:'movies',
            }
        }
    ])
    return res.render("websiteLayout", {
        template: "website/movie-category",
        pageTitle: "فیلم ها",
        name:req.session.name,
        family:req.session.family,
        movies:movies
      });
}


export const CategoryController = {index,getCategoryMovies}