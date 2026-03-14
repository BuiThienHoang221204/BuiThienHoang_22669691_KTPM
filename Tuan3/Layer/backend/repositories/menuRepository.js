const Menu = require('../models/menu');

class MenuRepository {
    async create(menuData) {
        const menu = new Menu(menuData);
        return await menu.save();
    }

    async findByName(name) {
        return await Menu.findOne({ name });
    }

    async findAll() {
        return await Menu.find();
    }

    async update(id, menuData) {
        return await Menu.findByIdAndUpdate(id, menuData, { new: true });
    }

    async delete(id) {
        return await Menu.findByIdAndDelete(id);
    }
    
    async findById(id) {
        return await Menu.findById(id);
    }
}

module.exports = new MenuRepository();
