const postService = require('../services/postService');

class PostController {
    async createPost(req, res) {
        try {
            const postData = { ...req.body, author: req.user.id };
            const post = await postService.createPost(postData);
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPostById(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePost(req, res) {
        try {
            const post = await postService.updatePost(req.params.id, req.body);
            res.json(post);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PostController();
