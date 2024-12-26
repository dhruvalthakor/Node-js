import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo() {
    const [userdata, setUserdata] = useState([]);
    const [tododata, settododata] = useState([]);
    const [user, setUser] = useState("");
    const [form, setForm] = useState({ todolist: "" });
    const navigate = useNavigate();
       const [value,setvalue]=useState(JSON.parse(localStorage.getItem("token"))||[]);
   

   

    

   
    

    useEffect(() => {
        if ( value.token) {
            
            const config = {
                headers: {
                    Authorization: `Bearer ${value.token}`,
                },
            };
            axios
                .get(`http://localhost:8000/todo`, config)
                .then((res) => {
                    setUserdata(res.data.userdata || []);
                    settododata(res.data.tododata || []);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }else{navigate("/login")}
    }, [value]);
    

    const handleData = (e) => {
        e.preventDefault();
    console.log(value,"post");
    
        if (!value) {
            alert("User not authenticated. Please log in.");
            navigate("/login");
            return;
        }
    
        const config = {
            headers: {
                Authorization: `Bearer ${value.token}`,
            },
        };
    
        axios
            .post(`http://localhost:8000/todo/addtodo`, form, config)
            .then((res) => {
                alert("Todo added successfully!");
                // Optionally refresh the todo list
                console.log(tododata);
                setForm({todolist:""})
            })
            .catch((error) => {
                console.error("Error submitting data:", error);
                if (error.response) {
                    console.log("Error response post:", error.response.data);
                }
                navigate("/login");
            });
    };
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4 border-0 rounded">
                        <h2 className="text-center mb-4">Add Todo</h2>
                        <form onSubmit={handleData}>
                            <div className="mb-3">
                                <label htmlFor="todoname" className="form-label">Todo Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="todoname"
                                    placeholder="Enter todo name"
                                    value={form.todolist}
                                    onChange={(e) => setForm({ ...form, todolist: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-success btn-block">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div>
    <ul>
        {/* {tododata.map((data, index) => (
            <li key={index}>{data.name}</li>
        ))} */}
    </ul>
</div>
        </div>
    );
}

export default Todo;
