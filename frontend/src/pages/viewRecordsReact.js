import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ViewRecordsReact = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user
    const history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    useEffect(() => {
        viewRecords();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/api/user/${userId}`);
            setAllUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            alert('User deleted successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const viewRecords = async () => {
        try {
            const response = await axios.get(`/api/getAllUsers?${Math.random()}`);
            setAllUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async () => {
        try {
            if (!selectedUser) return; // Make sure there's a selected user
            await axios.put(`/api/user/${selectedUser._id}`, { userName: updatedUsername });
            viewRecords();
            alert('User updated successfully');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
             <Link to="/viewRecords" className="btn btn-primary">View in Jquery</Link>
            <h1 className="my-4">All Records of users from React</h1>
            <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.userName}</td>
                            <td>
                                <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#userModal" onClick={() => { setUpdatedUsername(user.userName); setSelectedUser(user); }}>Update</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userModalLabel">Update Username</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="usernameInput">New Username:</label>
                                <input type="text" className="form-control" id="usernameInput" value={updatedUsername} onChange={(e) => setUpdatedUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleUpdate} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRecordsReact;
