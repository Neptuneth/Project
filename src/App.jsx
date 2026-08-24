import { useEffect, useState } from 'react';
import { getCartCount, loadCart, saveCart } from './cart.js';
import About from './components/About.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CartPage from './components/CartPage.jsx';
import Checkout from './components/Checkout.jsx';
import Contact from './components/Contact.jsx';
import Home from './components/Home.jsx';
import ProductPage from './components/ProductPage.jsx';
import { goTo } from './utils.js';

function Header({ activePage, search, setSearch, cartCount, onCart }) {
  return <header className="topbar">
    <div className="brand"><img src="/assets/logo.svg" alt="Mellow Shop Logo" className="brand-logo" /><div><div className="logo">Mellow Shop</div><div className="subtitle">ร้านออนไลน์</div></div></div>
    {activePage === 'home' && <div className="search-box"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ค้นหาสินค้า" /></div>}
    <nav className="main-nav menu"><a href="?page=home" className={activePage === 'home' ? 'active' : ''}>หน้าหลัก</a><a href="?page=about" className={activePage === 'about' ? 'active' : ''}>เกี่ยวกับ</a><a href="?page=contact" className={activePage === 'contact' ? 'active' : ''}>ติดต่อ</a></nav>
    {activePage === 'checkout' ? <a href="?page=home" className="cart-button compact-link">กลับหน้าร้าน</a> : <button className="cart-button" onClick={onCart} aria-label="เปิดหน้าตะกร้าสินค้า"><span>ตะกร้า</span><span className="cart-count">{cartCount}</span></button>}
  </header>;
}

function Footer() {
  return <footer className="page-footer"><p>Mellow Shop เป็นโปรเจคตัวอย่างสำหรับงาน ปวส. ที่ออกแบบให้เหมาะกับการนำเสนอและขยายต่อได้ง่าย</p><span>© 2026 Mellow Shop</span></footer>;
}

function handleInternalNavigation(event) {
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest('a[href^="?page="]');
  if (!link) return;
  event.preventDefault();
  const url = new URL(link.href, window.location.origin);
  goTo(url.searchParams.get('page') || 'home', url.searchParams.get('id'));
}

export default function App() {
  const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 'home');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onPop = () => {
      setPage(new URLSearchParams(window.location.search).get('page') || 'home');
      setCartOpen(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const addToCart = (id) => {
    const next = new Map(cart);
    next.set(id, (next.get(id) || 0) + 1);
    setCart(next);
    saveCart(next);
    setCartOpen(true);
  };

  const content = page === 'about' ? <About />
    : page === 'contact' ? <Contact />
      : page === 'product' ? <ProductPage addToCart={addToCart} />
        : page === 'cart' ? <CartPage cart={cart} setCart={setCart} />
          : page === 'checkout' ? <Checkout cart={cart} setCart={setCart} />
            : <Home search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} addToCart={addToCart} />;

  return <div className="app-shell" onClick={handleInternalNavigation}>
    <Header activePage={page} search={search} setSearch={setSearch} cartCount={getCartCount(cart)} onCart={() => goTo('cart')} />
    {content}
    <Footer />
    {page !== 'checkout' && page !== 'cart' && <CartDrawer cart={cart} setCart={setCart} open={cartOpen} close={() => setCartOpen(false)} />}
  </div>;
}
