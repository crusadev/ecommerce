const reviewModel = require('../models')

const postReview = async (req, res) => {
    const { user, stars, title, body } = req.body
    try {
        const Review = await reviewModel.create({ user, stars, title, body })
        res.status(200).json(Review)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postReview }

//All Reviews

const getAllReviews = async (req, res) => {
    try{
        const Reviews = await reviewModel.find()
        res.status(200).json(Reviews)
    } catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = { postReview, getAllReviews}


// Delete Review

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await reviewModel.findByIdAndDelete(id);

        // Verificare dacă review-ul există
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { postReview, deleteReview}
