const productModel = require('../models')

const postProduct = async (req, res) => {
    const { admin, name, description, images, stock, price, brand, category } = req.body
    try {
        const Product = await productModel.create({ admin, name, description, images, stock, price, brand, category })
        res.status(200).json(Product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// All Products

const getAllProducts = async (req, res) => {
    try {
        const Products = await productModel.find()
        res.status(200).json(Products)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { postProduct, getAllProducts }


//One Product

const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        // Verifică dacă produsul există
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
module.exports= {postProduct, getOneProduct}


// Delete Product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(id);

        //Verificare daca produsul exista
        if(!deletedProduct){
            return res.status(404).json({error: "Product not found"});
        }
        res.status(200).json({ message: "Product deleted successfully"});
    } catch(err){
        res.status(400).json({error:err.message});
    }
}
module.exports= {postProduct, deleteProduct}