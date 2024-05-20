import session from 'express-session'
import { DbSetting } from './DbSetting.js'

const makeSession =(uri)=>{
    return session({
        secret:'Q9OD9E9XLupbHNyiPg72kqtb417N5hpF',
        resave:false,
        saveUninitialized:true,
        store:DbSetting.sessionStore(uri),
        cookie:{
            httpOnly:true,
            maxAge:30*24*60*60*1000,
            priority:'high',
        }
    })
}

export const SessionSetting = {makeSession}