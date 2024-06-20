// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
