const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth('admin'), createProduct);
router.get('/', auth(['admin', 'manager']), getProducts);
router.put('/:id', auth(['admin', 'manager']), updateProduct);
router.delete('/:id', auth('admin'), deleteProduct);

module.exports = router;
