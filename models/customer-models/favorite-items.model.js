const { boolean } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favItemsSchema = new Schema({
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: [{ type: String }],
    date: { type: Date, default: Date.now },
    // userId: { type: String },
    // showOnCart: { type: Boolean },
    // paidStatus: { type: Boolean },

}, {
    timestamps: true,
});

const FavItems = mongoose.model('favItems', favItemsSchema);

module.exports = FavItems;