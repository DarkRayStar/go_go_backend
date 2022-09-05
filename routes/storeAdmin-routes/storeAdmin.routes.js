const router = require('express').Router();
let Item = require('../../models/storeAdmin-models/items.model');

//get all items
router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

//insert item
router.route('/add').post((req, res) => {
    
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const images = req.body.images;
    const offer = req.body.offer;

    const newItem = new Item({
        itemName ,
        description ,
        price ,
        quantity ,
        images ,
        offer
    });

    newItem.save()
        .then(() => res.json('Item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get item by ID
router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete item
router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//update item details
router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id)
        .then(item => {

            item.itemName = req.body.itemName;
            item.description = req.body.description;
            item.price = req.body.price;
            item.quantity = req.body.quantity;
            item.images = req.body.images;
            item.offer = req.body.offer;

            item.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;