// SaleOrderForm.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SaleOrderForm = ({ mode, order, closeModal, addOrder }) => {
  const [formData, setFormData] = useState({ customerName: '', price: '', invoice_date: new Date() });

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, invoice_date: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder({ ...formData, id: order ? order.id : new Date().getTime() }); // Generate a unique id if creating new
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === 'edit' ? 'Edit Sale Order' : 'Create Sale Order'}</h2>
      <label>
        Customer Name:
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Invoice Date:
        <DatePicker
          selected={formData.invoice_date}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={closeModal}>
        Cancel
      </button>
    </form>
  );
};

export default SaleOrderForm;
