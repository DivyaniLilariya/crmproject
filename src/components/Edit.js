import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        number: '',
    });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    useEffect(() => {        
        const userData = JSON.parse(localStorage.getItem('allUserData')).find(item => item.id === id);
        if (userData) {
            setUser(userData);
        } else {            
            console.error('User data not found');
            navigate('/users');
        }
    }, [id, navigate]);

    const handleUpdate = () => {
        const updatedData = JSON.parse(localStorage.getItem('allUserData')).map(item =>
            item.id === id ? { ...item, ...user } : item
        );
        localStorage.setItem('allUserData', JSON.stringify(updatedData));
        navigate('/view');
    };

    return (
        <div className='inputlist'>
        <h1>Update Lead Details</h1>
            <label>NAME</label><input type='text' placeholder='enter name' name='name' value={user.name} onChange={handleChange} />
            <label>EMAIL</label><input type='text' placeholder='enter email' name='email' value={user.email} onChange={handleChange} />
            <label>NUMBER</label><input type='number' placeholder='enter number' name='number' value={user.number} onChange={handleChange} />
            <label>Status</label>
<select name='status' value={user.status} onChange={handleChange}>
    <option value='new'>New</option>
    <option value='contacted'>Contacted</option>
    <option value='qualified'>Qualified</option>
</select>
            <button className='users' onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default Edit;
