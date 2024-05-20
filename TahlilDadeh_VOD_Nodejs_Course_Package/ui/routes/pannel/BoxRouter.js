import express from 'express'
import BoxController from '../../controllers/pannel/BoxController.js'

const BoxRouter = express.Router()

BoxRouter.get('/',new BoxController().index)
// BoxRouter.get('/:pageIndex',new BoxController().index)

BoxRouter.get('/search',new BoxController().search)

BoxRouter.get('/createModal',new BoxController().createModal)

BoxRouter.post('/create',new BoxController().create)

BoxRouter.get('/editModal',new BoxController().editModal)

BoxRouter.post('/edit',new BoxController().edit)

BoxRouter.post('/delete',new BoxController().delete)

BoxRouter.get('/createBoxMovieModal',new BoxController().createBoxMovieModal)

BoxRouter.post('/createBoxMovie',new BoxController().createBoxMovie)

BoxRouter.get('/showRelatedMovies',new BoxController().showRelatedMovies)

BoxRouter.post('/deleteBoxMovie',new BoxController().deleteBoxMovie)

export default BoxRouter