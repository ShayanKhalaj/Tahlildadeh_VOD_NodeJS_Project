import express from 'express'
import PannelRouter from './PannelRouter.js'
import WebsiteRouter from './WebsiteRouter.js'
import UserRouter from './security/UserRouter.js'
import { AuthSetting } from '../../security/settings/AuthSetting.js'

const MainRouter = express.Router()

MainRouter.get('/accessDenied',(req,res)=>{
    return res.render('accessDenied')
})


MainRouter.use('/',UserRouter)

MainRouter.use('/pannel',AuthSetting.isAdmin,PannelRouter)

MainRouter.use('/',WebsiteRouter)

export default MainRouter