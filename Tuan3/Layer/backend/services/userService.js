const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

class UserService {
    async register(userData) {
        return await userRepository.create(userData);
    }

    async login(username, password) {
        const user = await userRepository.findByUsername(username);
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
                expiresIn: '1h'
            });
            return { token, user };
        }
        throw new Error('Invalid credentials');
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        return await userRepository.findById(id);
    }

    async updateUser(id, userData) {
        return await userRepository.update(id, userData);
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}

module.exports = new UserService();
