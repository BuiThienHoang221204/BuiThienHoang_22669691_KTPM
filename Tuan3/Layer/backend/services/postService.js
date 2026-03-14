const postRepository = require('../repositories/postRepository');

class PostService {
    async createPost(postData) {
        return await postRepository.create(postData);
    }

    async getPostById(id) {
        return await postRepository.findById(id);
    }

    async getAllPosts() {
        return await postRepository.findAll();
    }

    async updatePost(id, postData) {
        return await postRepository.update(id, postData);
    }

    async deletePost(id) {
        return await postRepository.delete(id);
    }
}

module.exports = new PostService();
