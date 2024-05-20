import express from 'express'
import GenreController from '../../controllers/pannel/GenreController.js'

const GenreRouter = express.Router()

GenreRouter.get('/',new GenreController().index)

GenreRouter.get('/search',new GenreController().search)

GenreRouter.get('/createModal',new GenreController().createModal)

GenreRouter.post('/create',new GenreController().create)

GenreRouter.get('/editModal',new GenreController().editModal)

GenreRouter.post('/edit',new GenreController().edit)

GenreRouter.post('/delete',new GenreController().delete)

export default GenreRouter