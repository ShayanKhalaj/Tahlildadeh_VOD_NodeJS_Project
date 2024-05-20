import express from 'express'
import DashboardRouter from './pannel/DashboardRouter.js'
import ActorRouter from './pannel/ActorRouter.js'
import AuthorRouter from './pannel/AuthorRouter.js'
import DirectorRouter from './pannel/DirectorRouter.js'
import MusicianRouter from './pannel/MusicianRouter.js'
import GenreRouter from './pannel/GenreRouter.js'
import CategoryRouter from './pannel/CategoryRouter.js'
import MovieRouter from './pannel/MovieRouter.js'
import BoxRouter from './pannel/BoxRouter.js'
import CommentRouter from './pannel/CommentRouter.js'


const PannelRouter = express.Router()

PannelRouter.use('/dashboard',DashboardRouter)
PannelRouter.use('/ActorManagement',ActorRouter)
PannelRouter.use('/AuthorManagement',AuthorRouter)
PannelRouter.use('/DirectorManagement',DirectorRouter)
PannelRouter.use('/MusicianManagement',MusicianRouter)
PannelRouter.use('/GenreManagement',GenreRouter)
PannelRouter.use('/CategoryManagement',CategoryRouter)
PannelRouter.use('/MovieManagement',MovieRouter)
PannelRouter.use('/BoxManagement',BoxRouter)
PannelRouter.use('/CommentManagement',CommentRouter)

export default PannelRouter