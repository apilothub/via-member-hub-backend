import asyncHandler from 'express-async-handler'
import Category from '../models/category.model.js'

// @desc    Fetch products perpage
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json({categories: categories});
});


// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    return res.json(category || {});
});


// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        await category.remove();
        res.json({ message: 'Đã xóa category.' });
    } else {
        res.json({ message: 'Category đã được xóa trước đó!' });
    }
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    validateCategory(req.body);
    const category = new Category({
        name: req.body.name,
        user: req.user._id
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    validateCategory(req.body);

    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(400);
        throw new Error('Không tìm thấy category!');
    }

    category.name = name;

    const updatedCategory = await category.save();
    return res.json(updatedCategory);
});

const validateCategory = category => {
    if (!category.name || category.name.trim() == '') {
        throw Error("Tên loại không được rỗng");
    }
}

export {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
