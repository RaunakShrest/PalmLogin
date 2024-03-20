import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    // const [formData, setFormData] = useState({
    //     userName: '',
    //     password: ''
    // });
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        // setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
        console.log("Please fill all the fields");
        return;
    }

    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const response = await axios.post("/api/register", { userName, password }, config);
        const { data } = response;

        localStorage.setItem('userInfo', JSON.stringify(data));
        history.push('/login');
    } catch (error) {
        if (error.response && error.response.status === 409) {
                   setErrorMessage("User already exists");
        } else {
            console.error("Error occurred:", error);
            // Handle other errors here
        }
    }
};


    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Registration</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                   <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
