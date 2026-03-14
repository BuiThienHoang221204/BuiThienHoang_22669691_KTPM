const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null }
});

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    items: [MenuItemSchema]
});

module.exports = mongoose.model('Menu', MenuSchema);
