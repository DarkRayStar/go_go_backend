const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    images: [{type: String}],
    offer: { type: String, required: true },

}, {
    timestamps: true,
});

const Item = mongoose.model('items', itemSchema);

module.exports = Item;