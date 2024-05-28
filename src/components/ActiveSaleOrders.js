// ActiveSaleOrders.js
import React, { useState, useEffect } from 'react';
import SaleOrderForm from './SaleOrderForm'; // Adjust the path as needed
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css'; // If not already included

Modal.setAppElement('#root'); // Set the root element for accessibility

const ActiveSaleOrders = () => {
  // Initialize state with localStorage data or default values
  const [activeOrders, setActiveOrders] = useState(() => {
    const storedOrders = localStorage.getItem('activeOrders');
    return storedOrders ? JSON.parse(storedOrders).map(order => ({
      ...order,
      invoice_date: new Date(order.invoice_date)
    })) : [
      { id: 1, customerName: 'Spider', price: 100, invoice_date: new Date('2024-05-24T23:07:00') },
      { id: 2, customerName: 'Spider', price: 210, invoice_date: new Date('2024-05-24T23:30:00') },
    ];
  });

  useEffect(() => {
    // Save data to localStorage whenever activeOrders changes
    localStorage.setItem('activeOrders', JSON.stringify(activeOrders));
  }, [activeOrders]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mode, setMode] = useState('create');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (mode, order = null) => {
    setMode(mode);
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  const addOrder = (newOrder) => {
    if (mode === 'edit') {
      setActiveOrders(activeOrders.map(order => (order.id === newOrder.id ? newOrder : order)));
    } else {
      setActiveOrders([...activeOrders, { ...newOrder, id: activeOrders.length + 1 }]);
    }
    closeModal();
  };

  return (
    <div>
      <h2>Active Sale Orders</h2>
      <button onClick={() => openModal('create')}>+ Sale Order</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Price (₹)</th>
            <th>Invoice Date</th>
            <th>Edit/View</th>
          </tr>
        </thead>
        <tbody>
          {activeOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.price}</td>
              <td>{order.invoice_date.toLocaleString()}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  onClick={() => openModal('edit', order)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Sale Order Modal">
        <SaleOrderForm
          mode={mode}
          order={selectedOrder}
          closeModal={closeModal}
          addOrder={addOrder}
        />
      </Modal>
    </div>
  );
};

export default ActiveSaleOrders;
