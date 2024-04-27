import React, { useState } from "react";
import "./users.css";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating IDs
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    number: "",
    status: 'new',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();

    setUser({ ...user, id });

    const existingData = JSON.parse(localStorage.getItem("allUserData")) || [];

    const newData = [...existingData, { ...user, id }];
    localStorage.setItem("allUserData", JSON.stringify(newData));

    setUser({
      id: "",
      name: "",
      email: "",
      number: "",
      status: 'new',
    });
    navigate("/view");
  };

  return (
    <div className="inputlist">
    <h1>Add Lead Details</h1>
      <label>NAME</label>
      <input
        type="text"
        placeholder="enter name"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <label>EMAIL</label>
      <input
        type="text"
        placeholder="enter email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <label>NUMBER</label>
      <input
        type="number"
        placeholder="enter number"
        name="number"
        value={user.number}
        onChange={handleChange}
      />
      <label>Status</label>
      <select  name="status" value={user.status} onChange={handleChange}>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
      </select>
      <button className="users" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Users;
