const Event = require('../models/event.model');
const asyncHandler = require('express-async-handler');
const { paginateWithSearch } = require('../repositories/paginate.repositories');

// @desc Fetch Event
// @route GET /api/event
// @access Public
const getAllListEvent = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const keyword = req.query.keyword || '';

  const result = await paginateWithSearch({
    model: Event,
    page,
    limit,
    keyword,
    searchableField: 'ten_events'
  });

  res.json({
    statusCode: 200,
    message: 'Get Event success',
    ...result,
  });
});

// @desc Fetch single Event 
// @route GET /api/event/:id
// @access Public
const getEventById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    res.status(400);
    throw new Error("Invalid Event ID");
  }

  const event = await Event.findByPk(id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json({
    statusCode: 200,
    message: "Get Event By ID success",
    data: event,
  });
});

module.exports = {
  getAllListEvent,
  getEventById,
};
