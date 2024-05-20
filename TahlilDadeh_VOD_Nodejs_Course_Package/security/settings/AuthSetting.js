import passport from "passport"

const isLoggedIn =(req,res,next)=>{
    return passport.authenticate('local',{
        failureRedirect:'/login',
        cookie:{maxAge:30*24*60*60*1000}
    })
}

const isAuthorized = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next(null,false)
    }
    else{
        return res.redirect('/accessDenied')
    }
}

const isAdmin = (req,res,next)=>{
    
    if(req.isAuthenticated()&&req.session.passport.user.isAdmin){
        return next(null,false)
    }
    else{
        return res.redirect('/accessDenied')
    }
}


export const AuthSetting = {isLoggedIn,isAdmin,isAuthorized}