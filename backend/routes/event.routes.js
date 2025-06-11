const express = require('express');
const router = express.Router();

const {
  getAllListEvent,
  getEventById,
} = require('../controllers/event.controller');

router.route('/')
  .get(getAllListEvent);

router.route('/:id')
  .get(getEventById);

module.exports = router;
