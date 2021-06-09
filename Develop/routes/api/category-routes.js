const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint // 
// -- this is the URL that you enter into Insomnia or your browser -- //

router.get('/', (req, res) => {
  //find all
  Category.findAll({
    //in the product model with all column options
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    //then, if there is no data, send error 
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: "Error: no categories found. Please check to see if you have seeded your database. Then try again." });
        return;
      }
      //otherwise, send the data in json
      res.json(categoryData)
    })
    //if there's an error, console log error, throw status 500 with json text error
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  //find one
  Category.findOne({
    //where the id matches the id in the url
    where: {
      id: req.params.id
    },
    //in the product model in the category_id column
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
    //then respond with the category data in json format
    .then(categoryData =>
      res.json(categoryData)
    )
    //if there's an error, console log error, throw status 500 with json text error
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  //updates all instances that match the where options
  Category.update(
    //update the category name
    {
      category_name: req.body.category_name
    },
    {
      //where the id matches the one in the url
      where: req.params.id
    })
    //then 
    .then(categoryData => {
      //if there is no data, send an error
      if(!categoryData) {
        //respond with status 404 resouce cannot be found and error message
        res.status(404).json({ message: 'No Category found with that ID.' })
        return;
      }
      res.json(categoryData);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData) {
      //respond with status 404 resouce cannot be found and error message
      res.status(404).json({ message: 'No Category found with that ID.' })
      return;
    }
    res.json(categoryData);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error)
  })
});

module.exports = router;