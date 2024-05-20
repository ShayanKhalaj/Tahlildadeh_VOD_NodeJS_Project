import express from 'express'
import MusicianController from '../../controllers/pannel/MusicianController.js'

const MusicianRouter = express.Router()

MusicianRouter.get('/',new MusicianController().index)

MusicianRouter.get('/search',new MusicianController().search)

MusicianRouter.get('/createModal',new MusicianController().createModal)

MusicianRouter.post('/create',new MusicianController().create)

MusicianRouter.get('/editModal',new MusicianController().editModal)

MusicianRouter.post('/edit',new MusicianController().edit)

MusicianRouter.post('/delete',new MusicianController().delete)


export default MusicianRouter