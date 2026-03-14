import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('contributor');
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await updateUser(editingUser._id, { username, role });
        } else {
            await createUser({ username, password, role });
        }
        const { data } = await getUsers();
        setUsers(data);
        setUsername('');
        setPassword('');
        setRole('contributor');
        setEditingUser(null);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setUsername(user.username);
        setRole(user.role);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        const { data } = await getUsers();
        setUsers(data);
    };

    return (
        <div>
            <h2>Users</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                {!editingUser && (
                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                )}
                <div>
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="contributor">Contributor</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">{editingUser ? 'Update User' : 'Create User'}</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <p>Username: {user.username}</p>
                        <p>Role: {user.role}</p>
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
