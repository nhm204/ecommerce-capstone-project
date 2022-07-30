import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import ProductDetail from './pages/browse/components/Products/ProductDetail/ProductDetail';
import Products, { FeatureProducts } from './pages/browse/components/Products/ProductList';
import Home from './pages/browse/Home';
// import Owner from './pages/owner/Owner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/shop' element={<Products />}>
          <Route path='product' element={<ProductDetail />} />
        </Route>
        <Route path='/owner' element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
