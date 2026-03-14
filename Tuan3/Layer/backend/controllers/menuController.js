const menuService = require('../services/menuService');

class MenuController {
    async createMenu(req, res) {
        try {
            const menu = await menuService.createMenu(req.body);
            res.status(201).json(menu);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getMenuById(req, res) {
        try {
            const menu = await menuService.getMenuById(req.params.id);
            if (!menu) {
                return res.status(404).json({ message: 'Menu not found' });
            }
            res.json(menu);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllMenus(req, res) {
        try {
            const menus = await menuService.getAllMenus();
            res.json(menus);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateMenu(req, res) {
        try {
            const menu = await menuService.updateMenu(req.params.id, req.body);
            res.json(menu);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteMenu(req, res) {
        try {
            await menuService.deleteMenu(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MenuController();
