const {Router} = require('express')
const bookRouter = Router()
const {authMiddleware} = require('../middlewares/auth.middleware')
const { addBook, getAllBooks, getBookDetails, updateBook, deleteBook,  } = require('../controllers/books.controllers')


bookRouter.post('/',authMiddleware, addBook)
bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getBookDetails)
bookRouter.put('/:id', authMiddleware, updateBook)
bookRouter.delete('/:id', authMiddleware, deleteBook)


module.exports = {
    bookRouter : bookRouter
}