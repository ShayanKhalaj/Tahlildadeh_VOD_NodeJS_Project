import passport from "passport";
import { Strategy } from "passport-local";
import { UserRepository } from "../model/repository/UserRepository.js";
import { PassworSetting } from "./PassworSetting.js";

const LocalStrategy = Strategy;

const repo = UserRepository;

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verify = async (username, password, done) => {
  try {
    const user = await repo.getUserByUserName(username);
    if (!user) return done(null, false);
    const isValidPassword = PassworSetting.passwordValidator(
      password,
      user.salt,
      user.hash
    );
    if (isValidPassword) return done(null, user);
    else return done(null, false);
  } catch (error) {
    done(error, false);
  }
};

const strategy = () => {
  const strategy = new LocalStrategy(customFields,verify);
  passport.use(strategy)
};

const serializer =()=>{
    passport.serializeUser((user,done)=>{
        done(null,user)
    })
}

const deserializer = ()=>{
    passport.deserializeUser((user,done)=>{
        repo.getUserById(user.id)
        .then(()=>{
            done(null,true)
        })
        .catch((err)=>{
            done(err,false)
        })
    })
}

const initializer = ()=>{
    return passport.initialize()
}

const sessionizer = ()=>{
    return passport.session()
}

export const PassportSetting = {strategy,serializer,deserializer,initializer,sessionizer};
