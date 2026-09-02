import { useEffect, useState } from "react";
import { products } from "../utils/data.js";
import { saveCart } from "../utils/cart.js";

const formatPrice = (value) => `฿${value.toLocaleString("en-US")}`;

function goToCheckout() {
  window.history.pushState({}, "", "?page=checkout");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function CartPage({ cart, setCart }) {
  const [selectedIds, setSelectedIds] = useState(() => new Set(cart.keys()));

  useEffect(() => {
    setSelectedIds(
      (current) => new Set([...current].filter((id) => cart.has(id))),
    );
  }, [cart]);

  const cartItems = [...cart.entries()]
    .map(([id, quantity]) => ({
      product: products.find((item) => item.id === id),
      quantity,
    }))
    .filter((item) => item.product);
  const selectedItems = cartItems.filter(({ product }) =>
    selectedIds.has(product.id),
  );
  const selectedCount = selectedItems.reduce(
    (total, { quantity }) => total + quantity,
    0,
  );
  const selectedTotal = selectedItems.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );
  const allSelected =
    cartItems.length > 0 &&
    cartItems.every(({ product }) => selectedIds.has(product.id));

  const updateCart = (next) => {
    setCart(next);
    saveCart(next);
  };

  const changeQuantity = (id, amount) => {
    const next = new Map(cart);
    const quantity = (next.get(id) || 0) + amount;
    if (quantity > 0) next.set(id, quantity);
    else next.delete(id);
    updateCart(next);
  };

  const removeItem = (id) => {
    const next = new Map(cart);
    next.delete(id);
    updateCart(next);
  };

  const toggleSelected = (id) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      allSelected
        ? new Set()
        : new Set(cartItems.map(({ product }) => product.id)),
    );
  };

  const checkout = () => {
    if (!selectedItems.length) return;
    const selectedCart = new Map(
      selectedItems.map(({ product, quantity }) => [product.id, quantity]),
    );
    updateCart(selectedCart);
    goToCheckout();
  };

  return (
    <main className="cart-page">
      <section className="cart-page-heading">
        <div>
          <p className="eyebrow">SHOPPING BAG</p>
          <h1>ตะกร้าของฉัน</h1>
          <p>ตรวจสอบรายการสินค้า ปรับจำนวน และเลือกสินค้าที่ต้องการสั่งซื้อ</p>
        </div>
        <a href="?page=home" className="secondary-btn">
          เลือกซื้อสินค้าเพิ่ม
        </a>
      </section>

      {!cartItems.length ? (
        <section className="cart-empty-state">
          <div className="cart-empty-icon">🛒</div>
          <h2>ตะกร้าของคุณยังว่างอยู่</h2>
          <p>เติมสินค้าที่ชอบไว้ที่นี่ แล้วกลับมาสั่งซื้อได้ทุกเมื่อ</p>
          <a href="?page=home" className="primary-btn">
            ไปเลือกสินค้า
          </a>
        </section>
      ) : (
        <>
          <section className="cart-table" aria-label="รายการสินค้าในตะกร้า">
            <div className="cart-table-head">
              <label>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  aria-label="เลือกสินค้าทั้งหมด"
                />{" "}
                <span>เลือกทั้งหมด</span>
              </label>
              <span>สินค้า</span>
              <span>ราคา</span>
              <span>จำนวน</span>
              <span>รวม</span>
              <span />
            </div>
            {cartItems.map(({ product, quantity }) => (
              <article className="cart-table-row" key={product.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(product.id)}
                  onChange={() => toggleSelected(product.id)}
                  aria-label={`เลือก ${product.name}`}
                />
                <div className="cart-product-info">
                  <img src={product.image} alt={product.name} />
                  <div>
                    <span className="cart-product-category">
                      {product.category}
                    </span>
                    <h2>{product.name}</h2>
                    <p>พร้อมส่ง · {product.shipping}</p>
                  </div>
                </div>
                <strong>{formatPrice(product.price)}</strong>
                <div className="cart-quantity">
                  <button
                    onClick={() => changeQuantity(product.id, -1)}
                    aria-label={`ลดจำนวน ${product.name}`}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => changeQuantity(product.id, 1)}
                    aria-label={`เพิ่มจำนวน ${product.name}`}
                  >
                    +
                  </button>
                </div>
                <strong className="cart-line-total">
                  {formatPrice(product.price * quantity)}
                </strong>
                <button
                  className="cart-remove"
                  onClick={() => removeItem(product.id)}
                >
                  ลบ
                </button>
              </article>
            ))}
          </section>

          <section className="cart-bottom-bar">
            <div className="cart-selection-summary">
              <button className="text-button" onClick={toggleSelectAll}>
                {allSelected ? "ยกเลิกการเลือกทั้งหมด" : "เลือกทั้งหมด"}
              </button>
              <span>เลือกแล้ว {selectedCount} ชิ้น</span>
            </div>
            <div className="cart-total-summary">
              <div>
                <span>ยอดรวมสินค้า</span>
                <strong>{formatPrice(selectedTotal)}</strong>
              </div>
              <button
                className="primary-btn"
                onClick={checkout}
                disabled={!selectedItems.length}
              >
                ซื้อสินค้าที่เลือก ({selectedCount})
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
