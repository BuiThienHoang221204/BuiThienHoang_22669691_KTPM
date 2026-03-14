import React, { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../api/posts';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await getPosts();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (editingPost) {
            await updatePost(editingPost._id, { title, content });
        } else {
            await createPost({ title, content, author: user._id });
        }
        const { data } = await getPosts();
        setPosts(data);
        setTitle('');
        setContent('');
        setEditingPost(null);
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
    };

    const handleDelete = async (id) => {
        await deletePost(id);
        const { data } = await getPosts();
        setPosts(data);
    };

    return (
        <div>
            <h2>Posts</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type="submit">{editingPost ? 'Update Post' : 'Create Post'}</button>
            </form>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>Author: {post.author.username}</p>
                        <button onClick={() => handleEdit(post)}>Edit</button>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
