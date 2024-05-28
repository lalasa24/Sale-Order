import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const CompletedSaleOrders = ({ openModal }) => {
  const completedOrders = [
    { id: 1, customerName: 'Spider', price: 100, lastModified: '24/5/2024 (11:07 PM)' },
    { id: 2, customerName: 'Spider', price: 210, lastModified: '24/5/2024 (11:30 PM)' },
  ];

  return (
    <div>
      <h2>Completed Sale Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Price (₹)</th>
            <th>Last Modified</th>
            <th>Edit/View</th>
          </tr>
        </thead>
        <tbody>
          {completedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.price}</td>
              <td>{order.lastModified}</td>
              <td>
                <FontAwesomeIcon icon={faEllipsisH} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedSaleOrders;
