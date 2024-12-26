import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [value,setvalue]=useState(JSON.parse(localStorage.getItem("token"))||[]);
    const navigate = useNavigate();


    useEffect(()=>{
        localStorage.setItem("token",JSON.stringify(value))
    },[value])

    const handleData = (e) => {
        e.preventDefault();
      
        

        axios.post(`http://localhost:8000/user/login`, form) // Replace with your backend endpoint
            .then((res) => {
                console.log("Response:", res.data);
                setvalue(res.data)
                
                navigate("/todo");
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
                            <h2 className="text-center mb-4">Login</h2>
                            <form onSubmit={handleData}>
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
                                    <button type="submit" className="btn btn-success btn-block">Login</button>
                                </div>
                                <div className="text-center mt-3">
                                    <p>Don't have an account? <Link to={"/"} className="text-decoration-none">Sign Up</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
