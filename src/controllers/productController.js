const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { title, description, inventoryCount, price } = req.body;
  try {
    // Check for duplicate title
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this title already exists' });
    }

    // Only admin can add price
    if (req.user.role !== 'admin' && price !== undefined) {
      return res.status(403).json({ message: 'Only admin can set the price' });
    }

    const product = new Product({ title, description, inventoryCount, price });
    await product.save();
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, inventoryCount, price } = req.body;
  try {
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check for duplicate title
    if (title && title !== product.title) {
      const existingProduct = await Product.findOne({ title });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product with this title already exists' });
      }
    }

    // Only admin can update the price
    if (req.user.role !== 'admin' && price !== undefined) {
      return res.status(403).json({ message: 'Only admin can update the price' });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.inventoryCount = inventoryCount || product.inventoryCount;
    if (req.user.role === 'admin') {
      product.price = price !== undefined ? price : product.price;
    }

    await product.save();
    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
