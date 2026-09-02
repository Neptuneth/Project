import { useState } from "react";
import { products } from "../utils/data.js";
import { getCartTotal, saveCart } from "../utils/cart.js";
import { formatPrice, goTo } from "../utils/index.js";

const paymentMethods = [
  {
    value: "เก็บเงินปลายทาง",
    icon: "📦",
    title: "เก็บเงินปลายทาง",
    description: "ชำระเงินเมื่อได้รับสินค้า",
  },
  {
    value: "บัตรเครดิต",
    icon: "💳",
    title: "ตัดบัตรเครดิต",
    description: "ชำระผ่านบัตรเครดิตหรือเดบิต",
  },
  {
    value: "โอนผ่านธนาคาร",
    icon: "🏦",
    title: "โอนผ่านธนาคาร",
    description: "โอนเงินเข้าบัญชีของร้านค้า",
  },
];

export default function Checkout({ cart, setCart }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: paymentMethods[0].value,
  });
  const total = getCartTotal(cart, products);
  const submit = (event) => {
    event.preventDefault();
    if (!cart.size) return alert("ตะกร้าว่างอยู่ ไม่สามารถสั่งซื้อได้");
    localStorage.setItem(
      "shoppe-last-order",
      JSON.stringify({ ...form, items: [...cart], total: formatPrice(total) }),
    );
    setCart(new Map());
    saveCart(new Map());
    alert(`สั่งซื้อสำเร็จแล้ว! ขอบคุณ ${form.name} ที่ช้อปกับเรา`);
    goTo("home");
  };
  return (
    <main className="checkout-layout">
      <section className="checkout-form-card">
        <div className="page-header">
          <h1>ชำระเงิน</h1>
          <p>กรอกข้อมูลสำหรับจัดส่งและเลือกวิธีชำระเงิน</p>
        </div>
        <form className="checkout-form" onSubmit={submit}>
          <label>
            ชื่อ-นามสกุล
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              placeholder="เช่น สมชาย ใจดี"
            />
          </label>
          <label>
            เบอร์โทรศัพท์
            <input
              required
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              placeholder="081-234-5678"
            />
          </label>
          <label>
            ที่อยู่จัดส่ง
            <textarea
              required
              rows="4"
              value={form.address}
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })
              }
              placeholder="กรอกที่อยู่สำหรับจัดส่ง"
            />
          </label>
          <fieldset className="payment-fieldset">
            <legend>วิธีการชำระเงิน</legend>
            <div className="payment-options">
              {paymentMethods.map((method) => (
                <label
                  className={`payment-option ${form.payment === method.value ? "selected" : ""}`}
                  key={method.value}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={form.payment === method.value}
                    onChange={(event) =>
                      setForm({ ...form, payment: event.target.value })
                    }
                  />
                  <span className="payment-icon" aria-hidden="true">
                    {method.icon}
                  </span>
                  <span className="payment-copy">
                    <strong>{method.title}</strong>
                    <small>{method.description}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="primary-btn">
            ยืนยันคำสั่งซื้อ
          </button>
        </form>
      </section>
      <aside className="checkout-summary">
        <h2>สรุปคำสั่งซื้อ</h2>
        <div className="checkout-items">
          {[...cart.entries()].map(([id, quantity]) => {
            const product = products.find((item) => item.id === id);
            return (
              <div className="checkout-item" key={id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    {quantity} x {formatPrice(product.price)}
                  </p>
                </div>
                <strong>{formatPrice(product.price * quantity)}</strong>
              </div>
            );
          })}
        </div>
        <div className="summary-row">
          <span>ค่าจัดส่ง</span>
          <strong>ฟรี</strong>
        </div>
        <div className="summary-row total-row">
          <span>รวมทั้งสิ้น</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </aside>
    </main>
  );
}
