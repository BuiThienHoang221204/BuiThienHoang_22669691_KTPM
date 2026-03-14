import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import Users from './pages/Users';
import Menus from './pages/Menus';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/menus" element={<PrivateRoute><Menus /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
