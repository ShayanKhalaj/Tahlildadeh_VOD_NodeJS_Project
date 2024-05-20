import express from "express"
import { CommentController } from "../../controllers/pannel/CommentController.js"

const CommentRouter = express.Router()

CommentRouter.get('/',CommentController.index)

CommentRouter.get('/getAnswerModal',CommentController.getAnswerModal)

CommentRouter.post('/answer',CommentController.answer)

export default CommentRouter