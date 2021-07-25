const countriesRouter = require('express').Router();
const Country = require('../models/country');
const Comment = require('../models/comment');

countriesRouter.get('/:id', async (req, res) => {
  const country = await Country.findOne({ otherId: req.params.id }).populate(
    'comments'
  );
  res.status(200).json(country);
});

countriesRouter.post('/:id', async (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).end();
  }

  const newComment = new Comment({
    content: comment,
    countryId: req.params.id,
  });

  const savedComment = await newComment.save();
  const country = await Country.findOneAndUpdate(
    { otherId: req.params.id },
    {
      $push: {
        comments: savedComment._id,
      },
    },
    { upsert: true }
  );
  res.status(200).json(savedComment);
});

module.exports = countriesRouter;
