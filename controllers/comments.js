const commentsRouter = require('express').Router();
const Country = require('../models/country');
const Comment = require('../models/comment');

commentsRouter.delete('/:id', async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
    return res.status(400).end();
  }
  await Country.updateOne(
    { otherId: comment.countryId },
    { $pull: { comments: comment._id } }
  );
  res.status(204).end();
});

module.exports = commentsRouter;
