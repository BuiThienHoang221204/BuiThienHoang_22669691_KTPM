const menuRepository = require('../repositories/menuRepository');

class MenuService {
    async createMenu(menuData) {
        return await menuRepository.create(menuData);
    }

    async getMenuByName(name) {
        return await menuRepository.findByName(name);
    }

    async getAllMenus() {
        return await menuRepository.findAll();
    }

    async updateMenu(id, menuData) {
        return await menuRepository.update(id, menuData);
    }

    async deleteMenu(id) {
        return await menuRepository.delete(id);
    }

    async getMenuById(id) {
        return await menuRepository.findById(id);
    }
}

module.exports = new MenuService();
