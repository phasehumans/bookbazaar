const {Router} = require('express')
const reviewRouter = Router()
const {authMiddleware} = require('../middlewares/auth.middleware')
const { addReview, getReview, deleteReview } = require('../controllers/review.controllers')


reviewRouter.post('/:bookid', authMiddleware, addReview)
reviewRouter.get('/:bookid', authMiddleware, getReview)
reviewRouter.delete('/:id', authMiddleware, deleteReview)


module.exports = {
    reviewRouter : reviewRouter
}