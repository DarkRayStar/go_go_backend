const { boolean } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemCartSchema = new Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    images: [{ type: String }],
    offers: { type: String, required: true },
    userId: { type: String },
    showOnCart: { type: Boolean },
    paidStatus: { type: Boolean },

}, {
    timestamps: true,
});

const ItemCart = mongoose.model('itemCart', itemCartSchema);

module.exports = ItemCart;