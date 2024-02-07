const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    
    const tags = await Tag.findAll({ include: Product });
    return res.json(tags);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    
    const tag = await Tag.findByPk(req.params.id, { include: Product });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    return res.json(tag);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    
    const newTag = await Tag.create(req.body);
    return res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedTag[0] === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    return res.json({ message: 'Tag updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    
    const deletedRows = await Tag.destroy({ where: { id: req.params.id } });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    return res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
