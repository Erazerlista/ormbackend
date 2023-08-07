const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include their associated Products
    const categories = await Category.findAll({
      include: Product,
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include its associated Products
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const [rowsUpdated] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category updated successfully' });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const rowsDeleted = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsDeleted === 0) {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
