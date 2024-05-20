import express from 'express'
import { MovieController } from '../../controllers/website/MovieController.js'
import { BodyParserSetting } from '../../../security/settings/BodyParserSetting.js'
import { AttackSetting } from '../../../security/settings/AttackSetting.js'

const MovieRouter = express.Router()

MovieRouter.get('/:movieId',MovieController.index)

MovieRouter.post('/comment',BodyParserSetting.parseForm(),AttackSetting.csrfProtection(),MovieController.comment)

export default MovieRouter