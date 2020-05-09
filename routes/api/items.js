const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

// Items Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.route("/").get((req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route   POST api/items
// @desc    Create a post
// @access  Private
router.route("/").post(auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items/id
// @desc    delete a post
// @access  Private
router.route("/:id").delete(auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) =>
      item.remove().then(() => res.status(200).json({ succuess: true }))
    )
    .catch((err) =>
      res.status(404).json({ info: `deleting post with errors: ${err}` })
    );
});

module.exports = router;
