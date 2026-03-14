import React, { useState, useEffect } from 'react';
import { getMenus, createMenu, updateMenu, deleteMenu } from '../api/menus';

const Menus = () => {
    const [menus, setMenus] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [menuItems, setMenuItems] = useState([{ title: '', url: '' }]);
    const [editingMenu, setEditingMenu] = useState(null);

    useEffect(() => {
        const fetchMenus = async () => {
            const { data } = await getMenus();
            setMenus(data);
        };
        fetchMenus();
    }, []);

    const handleItemChange = (index, event) => {
        const values = [...menuItems];
        values[index][event.target.name] = event.target.value;
        setMenuItems(values);
    };

    const handleAddItem = () => {
        setMenuItems([...menuItems, { title: '', url: '' }]);
    };

    const handleRemoveItem = (index) => {
        const values = [...menuItems];
        values.splice(index, 1);
        setMenuItems(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingMenu) {
            await updateMenu(editingMenu._id, { name: menuName, items: menuItems });
        } else {
            await createMenu({ name: menuName, items: menuItems });
        }
        const { data } = await getMenus();
        setMenus(data);
        setMenuName('');
        setMenuItems([{ title: '', url: '' }]);
        setEditingMenu(null);
    };

    const handleEdit = (menu) => {
        setEditingMenu(menu);
        setMenuName(menu.name);
        setMenuItems(menu.items);
    };

    const handleDelete = async (id) => {
        await deleteMenu(id);
        const { data } = await getMenus();
        setMenus(data);
    };

    return (
        <div>
            <h2>Menus</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Menu Name</label>
                    <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                </div>
                <h3>Menu Items</h3>
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={item.title}
                            onChange={event => handleItemChange(index, event)}
                        />
                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={item.url}
                            onChange={event => handleItemChange(index, event)}
                        />
                        <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAddItem()}>Add Item</button>
                <button type="submit">{editingMenu ? 'Update Menu' : 'Create Menu'}</button>
            </form>
            <ul>
                {menus.map(menu => (
                    <li key={menu._id}>
                        <h3>{menu.name}</h3>
                        <button onClick={() => handleEdit(menu)}>Edit</button>
                        <button onClick={() => handleDelete(menu._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menus;
