const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tags.findAll({
    // be sure to include its associated Product data
    include: {
      model: Product
    }
  })
    .then(tagsData => {
      if (!tagsData) {
        res.status(404).json({ message: "Error: no tags found. Please check to see if you have seeded your database. Then try again." });
        return;
      }
      //otherwise, send the data in json
      res.json(tagsData)
    })
    //if there's an error, console log error, throw status 500 with json text error
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(tagData =>
      res.json(tagData)
    )
    //if there's an error, console log error, throw status 500 with json text error
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData =>
      res.json(tagData)
    )
    //if there's an error, console log error, throw status 500 with json text error
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if(!tagData) {
        //respond with status 404 resouce cannot be found and error message
        res.status(404).json({ message: 'No Tag found with that ID.' })
        return;
      }
      res.json(tagData);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
  });

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData) {
      //respond with status 404 resouce cannot be found and error message
      res.status(404).json({ message: 'No Product found with that ID.' })
      return;
    }
    res.json(tagData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error)
  })
});

module.exports = router;
