const { boolean } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemCartSchema = new Schema({
    itemName: { type: String },
    description: { type: String },
    price: { type: String },
    quantity: { type: String },
    orderedQuanity: { type: String },
    images: [{ type: String }],
    offers: { type: String },
    userId: { type: String },
    showOnCart: { type: Boolean },
    paidStatus: { type: Boolean },

}, {
    timestamps: true,
});

const ItemCart = mongoose.model('itemCart', itemCartSchema);

module.exports = ItemCart;