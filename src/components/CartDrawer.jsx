import { products } from "../utils/data.js";
import { getCartTotal, saveCart } from "../utils/cart.js";

const formatPrice = (value) => `฿${value.toLocaleString("en-US")}`;

function goToCheckout() {
  window.history.pushState({}, "", "?page=checkout");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function CartDrawer({ cart, setCart, open, close }) {
  const total = getCartTotal(cart, products);

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

  return (
    <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="cart-header">
        <h3>ตะกร้าสินค้า</h3>
        <button onClick={close} aria-label="ปิดตะกร้า">
          ✕
        </button>
      </div>
      <div className="cart-content">
        {cart.size === 0 ? (
          <p>ตะกร้าว่างอยู่ ลองเพิ่มสินค้าด้านบนได้เลย</p>
        ) : (
          [...cart.entries()].map(([id, quantity]) => {
            const product = products.find((item) => item.id === id);
            if (!product) return null;

            return (
              <div className="cart-item" key={id}>
                <img src={product.image} alt={product.name} />
                <div className="cart-item-details">
                  <div>
                    <h4>{product.name}</h4>
                    <p>
                      {formatPrice(product.price)} x {quantity}
                    </p>
                  </div>
                  <div className="quantity-controller">
                    <button
                      onClick={() => changeQuantity(id, -1)}
                      aria-label={`ลดจำนวน ${product.name}`}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => changeQuantity(id, 1)}
                      aria-label={`เพิ่มจำนวน ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="summary-row">
                    <span>รวม</span>
                    <strong>{formatPrice(product.price * quantity)}</strong>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => removeItem(id)}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>รวม</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <button
          className="primary-btn"
          onClick={() =>
            cart.size ? goToCheckout() : alert("กรุณาเพิ่มสินค้าในตะกร้าก่อน")
          }
        >
          สั่งซื้อเลย
        </button>
      </div>
    </aside>
  );
}
