import express from 'express'
import ActorController from '../../controllers/pannel/ActorController.js'

const ActorRouter = express.Router()

ActorRouter.get('/',new ActorController().index)

ActorRouter.get('/search',new ActorController().search)

ActorRouter.get('/createModal',new ActorController().createModal)

ActorRouter.post('/create',new ActorController().create)

ActorRouter.get('/editModal',new ActorController().editModal)

ActorRouter.post('/edit',new ActorController().edit)

ActorRouter.post('/delete',new ActorController().delete)

export default ActorRouter