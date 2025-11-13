const { ReviewModel } = require("../model/reviews.model")


const addReview = async(req, res) => {
    const bookid = req.params.bookid
    const userid = req.userid

    const comment = req.body.comment
    const ratings = req.body.ratings

    // console.log(req.body);

    if(!comment || !ratings){
        return res.json({
            message : "comment and rating is required"
        })
    }

    // console.log(req.body)

    try {
        await ReviewModel.create({
            comment : comment,
            ratings : ratings,
            reviewBook : bookid,
            reviewBy : userid
        })


        res.json({
            message : "review added"
        })

    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }
}

const getReview = async(req, res) => {
    const userid = req.userid
    const bookid = req.params.bookid

    try {
        const allReviews = await ReviewModel.find({
            reviewBook : bookid
        })

        res.json({
            message : "All Reviews",
            allReviews : allReviews
        })
    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }


}

const deleteReview = async(req, res) => {
    const userid = req.userid

    try {
        await ReviewModel.deleteOne({
            reviewBy : userid
        })

        res.json({
            message :  "review deleted"
        })

    } catch (error) {
        res.json({
            message : "server error",
            error : error.message
        })
    }
}


module.exports = {
    addReview : addReview,
    getReview : getReview,
    deleteReview : deleteReview
}