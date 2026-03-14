const userService = require('../services/userService');

class UserController {
    async register(req, res) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const { token, user } = await userService.login(username, password);
            res.json({ token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
