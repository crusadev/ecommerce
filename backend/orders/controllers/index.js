const orderModel = require('../models')
const productModel = require('../../products/models')
const { getCurrentUser } = require('../../users/controllers')

const postOrder = async (req, res) => {
    const { products } = req.body
    let total = 0
    try {
        /* Setting the bellow header for the 'getCurrentUser' controller
           (see its return documentation) */
        req.headers['return'] = true
        const User = await getCurrentUser(req, res)
        /* Using a for..of loop in order to iterate asynchronously through
           the array and increase the total */
        for (const product of products) {
            const Product = await productModel.findById(product)
            total += Product.price
        };
        const Order = await orderModel.create({ products, total, user: User._id })
        console.log('res')
        await res.status(200).json(Order)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const Orders = await orderModel.find()
        res.status(200).json(Orders)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getOneOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const Order = await orderModel.findById(id);
        if (!Order) {
            return res.status(404).json({ error: "InvalidId" });
        }
        res.status(200).json(Order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const Order = await orderModel.findByIdAndDelete(id);
        if (!Order) {
            return res.status(404).json({ error: "InvalidId" });
        }
        res.status(200).json("Order deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { postOrder, getAllOrders, getOneOrder, deleteOrder }