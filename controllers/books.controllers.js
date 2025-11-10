const { BookModel } = require("../model/books.model")


const addBook = async(req, res) => {
    const userid = req.userid
    const role = req.role

    const title = req.body.title
    const author = req.body.author
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    const stock = req.body.stock
    const coverUrl = req.body.coverUrl

    if(!title || !author || !price || !stock){
        return res.json({
            message : "title, author, price and stock is required"
        })
    }

    if(role == "user"){
        return res.json({
            message : "only admin can add book"
        })
    }

    try {
        await BookModel.create({
            title : title,
            author : author,
            price : price,
            description : description,
            category : category,
            stock : stock,
            coverUrl : coverUrl,
            addedBy : userid
        })

        res.json({
            message : "book added"
        })
    } catch (error) {
        res.json({
            message : "book is not added",
            error : error
        })
    }

}

const getAllBooks = async(req, res) => {
    try {
        const {category, author, title} = req.query

        const filter = {}

        if (category) filter.category = category;
        if (author) filter.author = author;
        if (title) filter.title = new RegExp(title, "i");       // regex patern

        const allbookslist = await BookModel.find(filter)
    
        if(allbookslist.length === 0){
            return res.json({
                message : "no books found"
            })
        }
    
        res.json({
            message : "list of all books",
            allBooks : allbookslist
        })
    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }

}

const getBookDetails = async (req, res) => {
    try {
        const bookId = req.params.id
        const bookDetails = await BookModel.findOne({
            _id : bookId
        })

        if(!bookDetails){
            return res.json({
                message : "books doesn't exist"
            })
        }

        res.json({
            message : "Book Deatils",
            details : bookDetails
        })
    
    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }

}

const updateBook = async(req, res) => {
    const userid = req.userid
    const role = req.role
    const bookId = req.params.id

    if(role === 'user'){
        return res.json({
            message : "only admin can update book"
        })
    }

    const {title, author, price, description, category, stock, coverUrl} = req.body

    try {
        await BookModel.updateOne({
            _id : bookId,
            addedBy : userid
        }, {
            title : title,
            author : author,
            price : price,
            description : description,
            coverUrl : coverUrl,
            category : category,
            stock : stock
    
        })
        

        res.json({
            message : "book updated",
        })

    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }
}

const deleteBook = async(req, res) => {
    const userid = req.userid;
    const role = req.role;
    const bookId = req.params.id;

    if (role === "user") {
      return res.json({
        message: "only admin can delete book",
      });
    }

    try {
        const result = await BookModel.deleteOne({
            _id : bookId,
            addedBy : userid
        })

        if (result.deletedCount === 0) {
          return res.json({
            message: "Book not found",
          });
        }

        res.json({
            message : "book deleted"
        })
    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }

}

module.exports = {
    addBook : addBook,
    getAllBooks : getAllBooks,
    getBookDetails : getBookDetails,
    updateBook : updateBook,
    deleteBook : deleteBook
}