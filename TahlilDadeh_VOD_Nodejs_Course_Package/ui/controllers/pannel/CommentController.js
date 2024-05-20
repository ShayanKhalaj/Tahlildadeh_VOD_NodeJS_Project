import TahlildadehVODDbContext from "../../../domain/context/TahlildadehVODDbContext.js"
import CommentAddEditModel from "../../../domain/dto/comments/CommentAddEditModel.js"

const db = new TahlildadehVODDbContext()

const index =async (req,res)=>{
    const comments =await db.comments.find({})
    return res.render('pannelLayout',{
        template:'pannel/comments/index',
        pageTitle:'مدیریت نظرات',
        comments:comments
    })
}

const getAnswerModal = async(req,res)=>{
    const comment = await db.comments.findOne({commentId:req.query.fieldId})
    return res.render('pannel/comments/answer',{
        comment:comment,
        csrfToken:req.csrfToken()
    })
}

const answer=async(req,res)=>{
    const model = new CommentAddEditModel({
        commentId:req.body.commentId,
        answer:req.body.answer,
        isAccepted:true,
        movieId:req.body.movieId,
        text:req.body.text,
        userId:req.body.userId,
        username:req.body.username
    })
    await db.comments.updateOne({commentId:req.body.commentId},{$set:model})
    return res.redirect('/pannel/CommentManagement')

}

export const CommentController = {index,getAnswerModal,answer}