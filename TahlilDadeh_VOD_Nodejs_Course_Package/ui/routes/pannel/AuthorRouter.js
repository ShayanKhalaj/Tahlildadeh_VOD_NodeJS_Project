import express from 'express'
import AuthorController from '../../controllers/pannel/AuthorController.js'

const AuthorRouter = express.Router()

AuthorRouter.get('/',new AuthorController().index)

AuthorRouter.get('/createModal',new AuthorController().createModal)

AuthorRouter.post('/create',new AuthorController().create)

AuthorRouter.get('/search',new AuthorController().search)

AuthorRouter.get('/editModal',new AuthorController().editModal)

AuthorRouter.post('/edit',new AuthorController().edit)

AuthorRouter.post('/delete',new AuthorController().delete)

export default AuthorRouter