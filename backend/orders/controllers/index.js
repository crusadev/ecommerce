const orderModel = require('../models')
const productModel = require('../../products/models')
const userModel = require('../../users/models')
const { currentUser } = require('../../functions/currentUser')

const postOrder = async (req, res) => {
    const { products } = req.body
    let total = 0
    try {
        const User = await currentUser(req, res)
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }

        /* Using a for..of loop in order to iterate asynchronously through
           the array and increase the total */
        for (const product of products) {
            const Product = await productModel.findById(product)
            total += Product.price
        };

        //Create order
        const Order = await orderModel.create({ products, total, user: User._id })

        //Add the order to User
        await userModel.findByIdAndUpdate(User._id, { $push: { orders: Order._id } })

        await res.status(200).json(Order)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllOrders = async (req, res) => {
    //in production -> only admins
    try {
        const Orders = await orderModel.find()
        res.status(200).json(Orders)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getOneOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const Order = await orderModel.findById(id);
        if (!Order) {
            return res.status(404).json({ error: "InvalidOrderId" });
        }
        //Check current user
        const User = await currentUser(req, res)
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }
        //Check user authorization
        if (User._id.toString() !== Order.user.toString() && User.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden" });
        }
        
        res.status(200).json(Order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await currentUser(req, res)
        if (!User) {
            return res.status(404).json({ error: "InvalidId" });
        }

        const Order = await orderModel.findById(id)
        if (!Order) {
            return res.status(404).json({ error: "InvalidOrderId" });
        }

        //Check user authorization
        if (User._id.toString() !== Order.user.toString() && User.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden" });
        }

        //Remove the order from User
        await userModel.findByIdAndUpdate(User._id, { $pull: { orders: Order._id } })

        //Delete order
        await orderModel.findByIdAndDelete(id);
        res.status(200).json("Order deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { postOrder, getAllOrders, getOneOrder, deleteOrder }