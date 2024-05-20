import express from 'express'
import DirectorController from '../../controllers/pannel/DirectorController.js'

const DirectorRouter = express.Router()

DirectorRouter.get('/',new DirectorController().index)

DirectorRouter.get('/createModal',new DirectorController().createModal)

DirectorRouter.post('/create',new DirectorController().create)

DirectorRouter.get('/search',new DirectorController().search)

DirectorRouter.get('/editModal',new DirectorController().editModal)

DirectorRouter.post('/edit',new DirectorController().edit)

DirectorRouter.post('/delete',new DirectorController().delete)

export default DirectorRouter