const aboutUs=(req,res)=>{
    return res.render('websiteLayout',{
        template: "website/about-us",
        pageTitle: "درباره ما",
        name:req.session.name,
        family:req.session.family,
    })
}

export const StaticPageController = {aboutUs}