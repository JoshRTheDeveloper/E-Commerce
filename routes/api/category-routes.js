const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!Category) {
      return res.status(404).json({ error: 'There are no Categories found' });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findOne({
      where: { id: categoryId },
      include: [{ model: Product }],
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

  
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    
    const { category_name } = req.body;
    const newCategory = await Category.create({
      category_name: category_name,
    });

    res.status(200).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    // Extract the updated category data from the request body
    const { category_name } = req.body;
    const categoryId = req.params.id;

    // Find the category by its `id` value
    const categoryToUpdate = await Category.findOne({
      where: { id: categoryId },
    });

    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await categoryToUpdate.update({
      category_name: category_name,
    });

    res.json(categoryToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    const categoryToDelete = await Category.findByPk(categoryId);

    if (!categoryToDelete) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await categoryToDelete.destroy();

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
