const ProductModel = require("../models/ProductModel");

class ProductController {
  async store(req, res) {
     const { title, description, price } = req.body;
      if (!title || !description || !price) {
        return res
          .status(400)
          .json({ msg: "Title, Description and Price is required." });
      }    
      const cretedProduct = await ProductModel.create(req.body);

      const productAlreadyExists = await ProductModel.findOne({ title });

      if (productAlreadyExists) {
        return res.status(400).json({ msg: " This name already exists." });
      }

      return res.status(200).json(cretedProduct);
  }

  async index(req, res) {
    try {
      const products = await ProductModel.find();

      return res.status(200).json(products);
    } catch (error) {
      return res.status(404).json({ msg: "Problem to find Product" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const products = await ProductModel.findById(id);

      if (!products) {
        return res.status(404).json({ msg: "Failed to list product." });
      }

      return res.status(200).json(products);
    } catch (error) {
      return res.status(404).json({ msg: "Failed to update product." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      await ProductModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json({ msg: "Product updated." });

    } catch (error) {
      return res.status(404).json({ msg: "Verify the product id." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const productDeleted = await ProductModel.findOneAndDelete(id);

      if (!productDeleted) {
        return res.status(404).json({ msg: "Product does not exists." });
      }
      return res.status(200).json({ msg: "Product deleted." });
    } catch (error) {}
    return res.status(404).json({ msg: "Failed to deleted product." });
  }
}

module.exports = new ProductController();
