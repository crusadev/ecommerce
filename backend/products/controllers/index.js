const productModel = require('../models')

const postProduct = async (req, res) => {
    //in production -> only admins
    const { admin, name, description, images, stock, price, brand, category } = req.body
    try {
        const Product = await productModel.create
            ({
                admin, name, description, images, stock, price, brand, category
            })
        res.status(200).json(Product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const Products = await productModel.find()
        res.status(200).json(Products)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const Product = await productModel.findById(id);
        if (!Product) {
            return res.status(404).json({ error: "InvalidId" });
        }
        res.status(200).json(Product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteProduct = async (req, res) => {
    //in production -> only admins
    try {
        const { id } = req.params;
        const Product = await productModel.findByIdAndDelete(id);
        if (!Product) {
            return res.status(404).json({ error: "InvalidId" });
        }
        res.status(200).json("Product deleted successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const putProduct = async (req, res) => {
    const { id } = req.params
    try {
        //Check current user
        const User = await currentUser(req, res)
        if (!User) {
            return res.status(403).json({ error: "InvalidId" });
        }
        //Check user authorization
        if (User.role !== 'admin') {
            return res.status(403).json({ error: "Forbidden" });
        }

        await productModel.findByIdAndUpdate(id, req.body)
        res.status(200).json("Product updated successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { postProduct, getAllProducts, getOneProduct, deleteProduct, putProduct }