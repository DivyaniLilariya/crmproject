import React, { useEffect, useState } from 'react';
import './view.css';
import { useNavigate } from 'react-router-dom';

const View = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [searchBar, setSearchBar] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('allUserData'));
        if (Array.isArray(userData)) {
            setUser(userData);
            setFilteredData(userData);
        } else {
            setUser([]);
            setFilteredData([]);
        }
    }, []);

    const handleDelete = (id) => {
        const updatedUsers = user.filter((item) => item.id !== id);
        localStorage.setItem('allUserData', JSON.stringify(updatedUsers));
        setUser(updatedUsers);
        setFilteredData(updatedUsers);
    };

    const handleSearch = () => {
        const filtered = user.filter((item) => {
            return item.name.toLowerCase().includes(searchBar.toLowerCase());
        });
        setFilteredData(filtered);
    };
    const goBack=()=>{
        navigate("/")
    }

    return (
        <div className='main'>
            <div className='search-container'>
                <input
                    type='text'
                    value={searchBar}
                    onChange={(e) => setSearchBar(e.target.value)}
                    placeholder='Search by name'
                />
                <button className='search-btn' onClick={handleSearch}>
                    Search
                </button>
                <button style={{fontSize:"20px", backgroundColor:"green"}} className='search-btn' onClick={goBack}>
                    Add Leads
                </button>
            </div>
            <table className='user-table'>
                <thead>
                    <tr className='table-heading'>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>NUMBER</th>
                        <th>STATUS</th>
                        <th>EDIT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, i) => (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.number}</td>
                            <td>{item.status}</td>
                            <td>
                                <button className='edit-btn' onClick={() => navigate(`/edit/${item.id}`)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className='delete-btn' onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default View;
