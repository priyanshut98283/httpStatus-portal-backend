const express = require('express');
const listController = require('../controllers/listController');
const authMiddleware = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authMiddleware, listController.createList);
router.get('/', authMiddleware, listController.getLists);
router.delete('/:id', authMiddleware, listController.deleteList);
router.put('/:id', authMiddleware, listController.updateList);

module.exports = router;
