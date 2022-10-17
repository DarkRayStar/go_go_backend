const { boolean } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemCartSchema = new Schema({
    itemId: { type: String },
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
    // orderedDate: { type: Date, default: Date.now },
    orderedDate: { type: String },
    userId: { type: String, required: true },

}, {
    timestamps: true,
});

const ItemCart = mongoose.model('itemCart', itemCartSchema);

module.exports = ItemCart;