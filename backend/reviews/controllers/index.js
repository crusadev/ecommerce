const reviewModel = require('../models')
const productModel = require('../../products/models')

const postReview = async (req, res) => {
    const { productId, stars, title, body } = req.body
    try {
        const User = req.headers.user
        const Review = await reviewModel.create({ user: User._id, stars, title, body })
        //Add Review to Product
        await productModel.findByIdAndUpdate(productId, { $push: { reviews: Review._id } })
        res.status(200).json(Review)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllReviews = async (req, res) => {
    //redundant, only for testing
    try {
        const Reviews = await reviewModel.find()
        res.status(200).json(Reviews)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteReview = async (req, res) => {
    const { id } = req.params;
    const { productId } = req.body
    try {
        const User = req.headers.user
        const Review = await reviewModel.findById(id);
        if (!Review) {
            return res.status(404).json({ error: "InvalidReviewId" });
        }
        //Check authorization
        if (User._id.toString() !== Review.user.toString() && User.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden" });
        }

        //Remove Review from Product
        await productModel.findByIdAndUpdate(productId, { $pull: { reviews: Review._id } })

        await reviewModel.findByIdAndDelete(id);
        res.status(200).json("Review deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { postReview, getAllReviews, deleteReview }
