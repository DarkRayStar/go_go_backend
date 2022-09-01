const router = require('express').Router();
let Fav = require('../../models/customer-models/favorite-items.model');

router.route('/').get((req, res) => {
    Fav.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const date = req.body.date;
    // const userId = req.body.userId;
    // const showOnCart = req.body.showOnCart;
    // const paidStatus = req.body.paidStatus;

    const newFav = new Fav({
        itemName,
        description,
        price,
        image,
        date,
        // userId,
        // showOnCart,
        // paidStatus,
    });

    newFav.save()
        .then(() => res.json('Item added to the Favorites!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Fav.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Fav.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
    Fav.deleteMany()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Fav.findById(req.params.id)
        .then(item => {
            item.itemName = req.body.itemName;
            item.description = req.body.description;
            item.price = req.body.price;
            item.image = req.body.image;
            item.date = req.body.date;
            // item.userId = req.body.userId;
            // item.showOnCart = req.body.showOnCart;
            // item.paidStatus = req.body.paidStatus;

            item.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;