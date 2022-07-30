import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { IoBagHandleOutline, IoCloseOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({ setSearchQuery, searchValue }) => {
  const [ inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleDirect = (e) => {
    if (e.key === 'Enter') {
      localStorage.setItem('searchValue', e.target.value);
      navigate('/shop');
    }
  }

  useEffect(() => setInputValue(searchValue), [searchValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
  };


  const handleClear = () => {
    localStorage.removeItem('searchValue');
    setSearchQuery();
    setInputValue('');
  };


  return (
    <nav className='navbar'>
      <Link to='/' className='logo'></Link>
      <div className='middle'>
        <Link to='/' className='nav-link'>Home</Link>
        <Link to='/shop' className='nav-link'>Shop</Link>
        <Link to='/owner' className='nav-link'>Owner</Link>
      </div>
      <div className='right-side'>
        <div className="searchbar">
          <FiSearch className='icon' />
          <input type='text' placeholder='Search' className='search-input' value={inputValue} onKeyPress={handleDirect} onChange={handleChange} />
          <IoCloseOutline onClick={handleClear} className='erase-icon' />
        </div>
        <div className='cart'>
          <IoBagHandleOutline className='cart-icon' />
          <div className='badge'>10</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;