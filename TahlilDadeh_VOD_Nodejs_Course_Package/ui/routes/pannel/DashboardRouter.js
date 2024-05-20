import express from 'express'
import DashboardController from '../../controllers/pannel/DashboardController.js'

const DashboardRouter = express.Router()

DashboardRouter.get('/',new DashboardController().index)

export default DashboardRouter