/* global bootstrap */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ViewRecords = () => {
    const [allUsers, setAllUsers] = useState([]);
const history=useHistory()

    useEffect(() => {
        viewRecords(); // Fetch users when the component mounts
    }, []);

    const viewRecords = async () => {
        try {
            const response = await axios.get("/api/getAllUsers"); // Fetch users using axios
            setAllUsers(response.data);
            displayUsers(response.data); // Call function to display users
        } catch (error) {
            console.log(error);
        }
    };

    const displayUsers = (users) => {
        const userList = document.getElementById('userList'); // Select the table body using DOM
        userList.innerHTML = ''; // Clear existing table body
        users.forEach(user => {
            // Create table row using DOM
            const row = document.createElement('tr');

            // Create table cells for username, update button, and delete button
            const usernameCell = document.createElement('td');
            usernameCell.textContent = user.userName; // Assuming userName is a property of each user

            const actionCell = document.createElement('td');

           

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'btn btn-danger';
            deleteButton.addEventListener('click', () => {
                // Handle delete button click (e.g., delete user)
                deleteUser(user._id);
            });

            // Append buttons to action cell

            actionCell.appendChild(deleteButton);

            // Append cells to row
            row.appendChild(usernameCell);
            row.appendChild(actionCell);

            // Attach click event to row
            row.addEventListener('click', () => {
                showUpdateModal(user);
            });

            // Append row to table
            userList.appendChild(row);
        });
    };
const updateUsername = (userId, newUsername) => {
        // Implement logic to update the username
        console.log('Update user with ID:', userId, 'to new username:', newUsername);
        // Example axios request to update the username
        /*
        axios.put(`/api/users/${userId}`, { username: newUsername })
            .then(response => {
                // Handle success
                console.log('Username updated successfully:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error updating username:', error);
            });
        */
    };
const showUpdateModal = (user) => {
    // Update the modal content
    const modalUserNameInput = document.getElementById('modalUserNameInput');
    modalUserNameInput.value = user.userName;

    const updateUsernameBtn = document.getElementById('updateUsernameBtn');
    updateUsernameBtn.addEventListener('click', () => {
        const newUsername = modalUserNameInput.value;
        // Call a function to update the username
        updateUsername(user._id, newUsername);
    });

    // Show the modal using Bootstrap's modal method
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
};


    const deleteUser = (userId) => {
        // Implement logic to delete user
        console.log('Delete user with ID:', userId);
    };


    return (
        
        <div className="container">
             <Link to="/viewRecordsReact" className="btn btn-primary">View in React</Link>
              
            <h1 className="my-4">All Records of users from Jquery with Popup model. </h1>
     
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody id="userList"></tbody> {/* Placeholder for the user table body */}
            </table>

            {/* User Modal */}
            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userModalLabel">User Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                      <div className="modal-body">
    <label htmlFor="modalUserNameInput" className="form-label">Username:</label>
    <input type="text" className="form-control" id="modalUserNameInput" />
    <div className="mt-2">
        <button id="updateUsernameBtn" className="btn btn-primary">Update Username</button>
    </div>
  
</div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
             
           
            </div>

             
        </div>
        
    );
};

export default ViewRecords;
