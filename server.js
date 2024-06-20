import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

// MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shubhammali929:ObDJqu9ddCeW66VF@cluster0.3l0prq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Middleware
app.use(bodyParser.json());

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});
const Category = mongoose.model('Category', categorySchema);

// Subcategory Schema
const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});
const Subcategory = mongoose.model('Subcategory', subcategorySchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  status: { type: String, default: 'active' }
});
const Product = mongoose.model('Product', productSchema);


// Add new category
app.post('/api/categories', async (req, res) => {
  try {
    const { name, status } = req.body;
    const newCategory = new Category({ name, status });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new subcategory
app.post('/api/subcategories', async (req, res) => {
  try {
    const { name, category_id, status } = req.body;
    const newSubcategory = new Subcategory({ name, category_id, status });
    await newSubcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a category by ID
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get subcategories by category ID
app.get('/api/subcategories', async (req, res) => {
  try {
    const { category_id } = req.query;
    let subcategories;
    if (category_id) {
      subcategories = await Subcategory.find({ category_id });
    } else {
      subcategories = await Subcategory.find();
    }
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint to update subcategory status
app.patch('/api/subcategories/:id/status', async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const subcategory = await Subcategory.findById(subcategoryId);
    
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    subcategory.status = subcategory.status === 'active' ? 'inactive' : 'active';
    await subcategory.save();
    
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory status', error: error.message });
  }
});



// Add new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, subcategory, status } = req.body;

    const newProduct = new Product({ name, category, subcategory, status });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().populate('category subcategory');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
