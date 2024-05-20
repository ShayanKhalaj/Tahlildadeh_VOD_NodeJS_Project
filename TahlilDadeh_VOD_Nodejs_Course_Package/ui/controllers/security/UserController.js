import { UserRepository } from "../../../security/model/repository/UserRepository.js";
import { PassworSetting } from "../../../security/settings/PassworSetting.js";

const getSignUpPage = (req, res) => {
  return res.render("websiteLayout", {
    pageTitle: "ثبت نام",
    template: "website/sign-up",
    name:req.session.name,
    family:req.session.family,
  });
};

const signup =async (req, res,next) => {
  if (req.body.password === req.body.rePassword) {
    const getHash = PassworSetting.passworGenrator(req.body.password);
    req.body.password = getHash;
    const result =await UserRepository.register({
        name:req.body.name,
        family:req.body.family,
        profileImageUrl:'',
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender==='on'?true:false,
        birthDay:req.body.birthDay,
        isAdmin:false,
        username:req.body.username,
        hash:getHash.hash,
        salt:getHash.salt,
    })
    if(result===true){
        return res.redirect('/login')
    }
    if(result==='existed'){
        return res.redirect('/login')
    }
    else{
        return res.redirect('/signup')
    }

  } else {
    return res.json("رمز عبور صحیح نیست");
  }
};

const getLoginPage = (req,res)=>{
  console.log(req)
  return res.render('websiteLayout',{
    pageTitle:'ورود',
    template:'website/login',
    name:req.session.name,
    family:req.session.family,
    csrfToken:req.csrfToken()
  })
}

const login =(req,res)=>{
  if(req.body.rememberMe==="on"){
    req.session.cookie.maxAge = 30*24*60*60*1000
  }
  if(req.body.rememberMe!=="on"){
    req.session.cookie.expires = false
  }
  req.session.name = req.session.passport.user.name
  req.session.family = req.session.passport.user.family
  if(req.session.passport.user.isAdmin){
    return res.redirect('/pannel/dashboard')
  }
  else{
    return res.redirect('/')
  }
}

const logout = (req,res,next)=>{
  req.logout((err)=>{
    if(err) return next(err)
    else return res.redirect('/login')
  })
}

export const UserController = { getSignUpPage, signup,getLoginPage,login,logout };
