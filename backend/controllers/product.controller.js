import asyncHandler from 'express-async-handler'
import Product from '../models/product.model.js'

// @desc    Fetch products perpage
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const categoryId = req.query.categoryId || '';

  const query = {};
  
  if (req.query.keyword) {
    query = {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
   };
  }

  if (categoryId) {
    query.category = categoryId;
  }

  const count = await Product.countDocuments({ ...query });
  const products = await Product.find({ ...query })
                                .sort({createdAt: 'desc'})
                                .limit(pageSize)
                                .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  return res.json(product || {});
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Sản phẩm đã bị xóa!' });
  } else {
    res.json({ message: 'Sản phẩm đã được xóa trước đó!C' });
  }
});

// create product from FE
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = req.body;
  validateProduct(product);

  const createdProduct = await new Product({
    name: product.name,
    price: product.price,
    user: req.user._id,
    image: product.image,
    brand: product.brand,
    category: product.category,
    numReviews: 0,
    description: product.description,
    reviews: []
  }).save();

  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error('Sản phẩm không tìm thấy!');
  }

  validateProduct(product);
    
  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;

  const updatedProduct = await product.save();
  return res.json(updatedProduct);
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Sản phẩm không tìm thấy!');
  }

  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Bạn đã đánh giá sản phẩm này rồi!');
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'Đã thêm đánh giá' });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.json(products)
});

const validateProduct = product => {
  if (!product.name || product.name.trim() == '') {
    throw Error("Tên sản phẩm không được rỗng!");
  }

  if (product.price <= 0) {
    throw Error("Giá sản phẩm phải lớn hơn 0!");
  }

  if (!product.image) {
    throw Error("Hình sản phẩm không được rỗng!");
  }

  if (!product.brand || product.brand.trim() == '') {
    throw Error("Nhãn hiệu không được rỗng!");
  }

  if (!product.category) {
    throw Error("Phải chọn category cho sản phẩm!");
  }

  if (!product.description || product.description.trim() == '') {
    throw Error("Mô tả không được rỗng!");
  }

};

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
