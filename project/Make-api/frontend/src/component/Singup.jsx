import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleData = (e) => {
        e.preventDefault();
       

        axios.post(`http://localhost:8000/user/adduser`, form) // Replace with your backend endpoint
            .then((res) => {
                // console.log("Response:", res.data);
                navigate("/login");
            })
            .catch((error) => {
                console.log("Error submitting data:", error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0 rounded">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <form onSubmit={handleData}>
                                <div className="mb-3">
                                    <label htmlFor="inputName" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputName"
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Enter your password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success btn-block">Sign Up</button>
                                </div>
                                <div className="text-center mt-3">
                                    <p>Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
