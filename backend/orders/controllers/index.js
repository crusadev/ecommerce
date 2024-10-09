const orderModel = require('../models')

const postOrder= async (req, res) => {
    const { products, sum, stock, user } = req.body
    try {
       const Order = await orderModel.create({products, sum, stock, user})
       res.json(Order)
    } catch (err) { console.log(err) }
}

module.exports = {postOrder}