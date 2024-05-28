// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import ActiveSaleOrders from './components/ActiveSaleOrders';
import CompletedSaleOrders from './components/CompletedSaleOrders';
import SaleOrderForm from './components/SaleOrderForm';
import { AuthProvider } from './AuthContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

Modal.setAppElement('#root');

const Home = ({ openModal }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div className="tabs">
        <Link to="active">Active Sale Orders</Link>
        <Link to="completed">Completed Sale Orders</Link>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          Dark Theme
        </label>
      </div>
      <Outlet />
    </div>
  );
};

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (mode, order) => {
    setFormMode(mode);
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={
              <PrivateRoute>
                <Home openModal={openModal} />
              </PrivateRoute>
            }>
              <Route path="active" element={<ActiveSaleOrders openModal={openModal} />} />
              <Route path="completed" element={<CompletedSaleOrders openModal={openModal} />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <SaleOrderForm mode={formMode} order={selectedOrder} closeModal={closeModal} />
        </Modal>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
