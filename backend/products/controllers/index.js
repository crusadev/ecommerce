const productModel = require('../models')

const postProduct = async (req, res) => {
    const { name, description, images, stock, price, brand, category } = req.body
    try {
       const Product = await productModel.create({name, description, images, stock, price, brand, category})
       res.json(Product)
    } catch (err) { console.log(err) }
}

module.exports = {postProduct}