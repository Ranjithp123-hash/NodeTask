const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inventoryCount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: function() { return this.isModified('price'); }
  }
});

module.exports = mongoose.model('Product', ProductSchema);
