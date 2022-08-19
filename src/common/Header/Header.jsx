import React, { useEffect, useState } from 'react';
import './Header.scss';
import { IoBagHandleOutline, IoCloseOutline } from "react-icons/io5";
import { FiSearch, FiMenu } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GET_CUSTOMER } from '../../data/queries/getCustomer';
import { useQuery } from '@apollo/client';


const Header = ({ setSearchQuery, searchValue, setSelectedCategory, setCurrentPage, link }) => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ inputValue, setInputValue] = useState('');
  const [ navLinkSelected, setNavLinkSelected] = useState(link);
  const navigate = useNavigate();
  const { data } = useQuery(GET_CUSTOMER, {
    variables: {
      'customerId': 'hmy'
    }
  });

  const handleDirect = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
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
    setCurrentPage(1);
  };

  const handleClear = () => {
    localStorage.removeItem('searchValue');
    setSearchQuery();
    setInputValue('');
    setSearchParams();
    setSelectedCategory('');
  };
 
  return (
    <div className='app-header'>
      <nav className='navbar'>
        <div className='left-side'>
          <Link to='/' className={navLinkSelected === 'Home' ? 'nav-item-link active' : 'nav-item-link'} onClick={() => setNavLinkSelected('Home')}>Home</Link>
          <Link to='/shop' className={navLinkSelected === 'Shop' ? 'nav-item-link active' : 'nav-item-link'} onClick={() => setNavLinkSelected('Shop')}>Shop</Link>
          <Link to='/owner' className={navLinkSelected === 'Owner' ? 'nav-item-link active' : 'nav-item-link'} onClick={() => setNavLinkSelected('Owner')}>Owner</Link>
        </div>
        <Link to='/' className='navbar-logo'></Link>
        <div className='right-side'>
          <label htmlFor='nav-mobile-search' className='mobile-search-btn'>
            <FiSearch />
          </label>
          <input type='checkbox' id='nav-mobile-search' hidden className='nav-search-checkbox-input' />
          <div className="searchbar">
            <FiSearch className='icon' />
            <input type='text' placeholder='Search' className='search-input' value={inputValue || ''} onKeyPress={handleDirect} onChange={handleChange} />
            <IoCloseOutline onClick={handleClear} className='erase-icon' />
          </div>
          <Link to='/checkout' className='cart'>
            <IoBagHandleOutline className='cart-icon' />
            <div className='badge'>{data?.customer.items.length}</div>
          </Link>

          {/* Navbar for mobile */}
          <label htmlFor='nav-mobile-input' className='nav-mobile-btn'>
            <FiMenu />
          </label>
          <input type='checkbox' id='nav-mobile-input' className='nav-checkbox-input' />
          <label htmlFor="nav-mobile-input" className="nav-overlay" />
          <div className='nav-mobile-wrapper'>
            <label htmlFor='nav-mobile-input' className='close-btn'>
              <IoCloseOutline />       
            </label>
            <div className="nav-mobile">
              <Link to='/' className={navLinkSelected === 'Home' ? 'nav-item-link active' : 'nav-item-link'} onClick={() => setNavLinkSelected('Home')}>Home</Link>
              <Link to='/shop' className={navLinkSelected === 'Shop' ? 'nav-item-link active' : 'nav-item-link'} onClick={() => setNavLinkSelected('Shop')}>Shop</Link>
              <Link to='/owner' className={navLinkSelected === 'Owner' ? 'nav-item-link active' : 'nav-item-link'} onClick={() => setNavLinkSelected('Owner')}>Owner</Link>
            </div>
          </div>
          
        </div>
      </nav>
      <div className='marquee-wrapper'>
        <marquee direction="left">FREE SHIPPING + RETURNS, FREE MEMBERSHIP, EXCLUSIVE PRODUCTS</marquee>
      </div>
    </div>
  )
}

export default Header;