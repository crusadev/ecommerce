const orderModel = require('../models')

const postOrder = async (req, res) => {
    const { products, total, user } = req.body
    try {
        const Order = await orderModel.create({ products, total, user })
        res.status(200).json(Order)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postOrder }