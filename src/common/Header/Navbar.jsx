import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { IoBagHandleOutline, IoCloseOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryGetCustomer } from '../../data/queries/getCustomer';


const Navbar = ({ setSearchQuery, searchValue, setSelectedCategory, link }) => {
  const { data } = useQueryGetCustomer();
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ inputValue, setInputValue] = useState('');
  const [ navLinkSelected, setNavLinkSelected] = useState(link);
  const navigate = useNavigate();

  const handleDirect = (e) => {
    if (e.key === 'Enter') {
      localStorage.setItem('searchValue', e.target.value);
      navigate({ pathname: '/shop', search: `?search=${e.target.value}`});
    }
  }
  
  useEffect(() => setInputValue(searchValue), [searchValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
    setSearchParams({ search: e.target.value })
    setSelectedCategory('');
  };

  const handleClear = () => {
    localStorage.removeItem('searchValue');
    setSearchQuery();
    setInputValue('');
    setSearchParams();
    setSelectedCategory('');
  };
 
 
  return (
    <nav className='navbar'>
      <div className='top'>
        <Link to='/' className='logo'></Link>
        <div className='middle'>
          <Link to='/' className={navLinkSelected === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => setNavLinkSelected('Home')}>Home</Link>
          <Link to='/shop' className={navLinkSelected === 'Shop' ? 'nav-link active' : 'nav-link'} onClick={() => setNavLinkSelected('Shop')}>Shop</Link>
          <Link to='/owner' className={navLinkSelected === 'Owner' ? 'nav-link active' : 'nav-link'} onClick={() => setNavLinkSelected('Owner')}>Owner</Link>
        </div>
        <div className='right-side'>
          <div className="searchbar">
            <FiSearch className='icon' />
            <input type='text' placeholder='Search' className='search-input' value={inputValue} onKeyPress={handleDirect} onChange={handleChange} />
            <IoCloseOutline onClick={handleClear} className='erase-icon' />
          </div>
          <Link to='/checkout' className='cart'>
            <IoBagHandleOutline className='cart-icon' />
            <div className='badge'>{data?.customer.items.length}</div>
          </Link>
        </div>
      </div>
      <div className='bottom'>
        <marquee direction="left">FREE SHIPPING + RETURNS, FREE MEMBERSHIP, EXCLUSIVE PRODUCTS</marquee>
      </div>
    </nav>
  )
}

export default Navbar;