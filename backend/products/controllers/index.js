const productModel = require('../models')

const postProduct = async (req, res) => {
    const { name, description, images, stock, price, brand, category } = req.body
    try {
        productModel.create({name, description, images, stock, price, brand, category})
            .then(result => res.json(result))
            .catch(err => res.json(err))
    } catch (err) { console.log(err) }
}