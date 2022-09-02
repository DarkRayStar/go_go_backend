const router = require('express').Router();
let Cart = require('../../models/customer-models/item-cart.model');

router.route('/').get((req, res) => {
    Cart.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const images = req.body.images;
    const offers = req.body.offers;
    const userId = req.body.userId;
    const showOnCart = req.body.showOnCart;
    const paidStatus = req.body.paidStatus;

    const newCart = new Cart({
        itemName,
        description,
        price,
        quantity,
        images,
        offers,
        userId,
        showOnCart,
        paidStatus,
    });

    newCart.save()
        .then(() => res.json('Item added to the cart!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Cart.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
    Cart.deleteMany()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Cart.findById(req.params.id)
        .then(item => {
            item.itemName = req.body.itemName;
            item.description = req.body.description;
            item.price = req.body.price;
            item.quantity = req.body.quantity;
            item.images = req.body.images;
            item.offers = req.body.offers;
            item.userId = req.body.userId;
            item.showOnCart = req.body.showOnCart;
            item.paidStatus = req.body.paidStatus;

            item.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;