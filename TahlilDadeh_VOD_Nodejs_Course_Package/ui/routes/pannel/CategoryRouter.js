import express from 'express'
import CategoryController from '../../controllers/pannel/CategoryController.js'
import UploadFile from '../../../framwork/utilities/UploadFile.js'

const CategoryRouter = express.Router()

CategoryRouter.get('/',new CategoryController().index)

CategoryRouter.get('/search',new CategoryController().search)

CategoryRouter.get('/createModal',new CategoryController().createModal)

CategoryRouter.post('/create',UploadFile.uploadImage('ui/public/Images').single('categoryImageUrl'),new CategoryController().create)

CategoryRouter.get('/editModal',new CategoryController().editModal)

CategoryRouter.post('/edit',new CategoryController().edit)

CategoryRouter.get('/editImageModal',new CategoryController().editImageModal)

CategoryRouter.post('/editImage',UploadFile.uploadImage('ui/public/Images').single('categoryImageUrl'),new CategoryController().editImage)

CategoryRouter.post('/delete',new CategoryController().delete)

export default CategoryRouter