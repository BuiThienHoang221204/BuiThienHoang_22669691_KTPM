const Post = require('../models/post');

class PostRepository {
    async create(postData) {
        const post = new Post(postData);
        return await post.save();
    }

    async findById(id) {
        return await Post.findById(id).populate('author', 'username');
    }

    async findAll() {
        return await Post.find().populate('author', 'username');
    }

    async update(id, postData) {
        return await Post.findByIdAndUpdate(id, postData, { new: true });
    }

    async delete(id) {
        return await Post.findByIdAndDelete(id);
    }
}

module.exports = new PostRepository();
