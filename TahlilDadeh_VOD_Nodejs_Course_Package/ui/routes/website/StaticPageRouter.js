import express from 'express'
import { StaticPageController } from '../../controllers/website/StaticPageController.js'

const StaticPageRouter = express.Router()

StaticPageRouter.get('/about-us',StaticPageController.aboutUs)

export default StaticPageRouter