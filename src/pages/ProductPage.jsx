import { useState } from "react";
import { products } from "../utils/data.js";
import ProductCard from "../components/ProductCard.jsx";
import { formatPrice, goTo } from "../utils/index.js";

const starterComments = [
  {
    id: 1,
    name: "นภัสสร",
    message: "สินค้าดีมาก ส่งเร็วและแพ็กเก่งมากครับ",
    time: "2 วันที่แล้ว",
  },
  {
    id: 2,
    name: "ธีร์",
    message: "ใช้งานดี คุ้มค่า และสีสวยมาก",
    time: "1 สัปดาห์ที่แล้ว",
  },
  {
    id: 3,
    name: "วิน",
    message: "สั่งซื้อแล้วได้รับตรงตามที่เห็น จัดส่งไวมาก",
    time: "2 สัปดาห์ที่แล้ว",
  },
];

export default function ProductPage({ addToCart, productId }) {
  const id = Number(
    productId ?? new URLSearchParams(window.location.search).get("id"),
  );
  const product = products.find((item) => item.id === id);
  const [comments, setComments] = useState(starterComments);
  const [draft, setDraft] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    setComments((current) => [
      {
        id: Date.now(),
        name: "คุณ",
        message: trimmed,
        time: "ตอนนี้",
      },
      ...current,
    ]);
    setDraft("");
  }

  if (!product)
    return (
      <main>
        <section className="page-header">
          <h1>เลือกสินค้า</h1>
          <p>เลือกสินค้าที่แนะนำด้านล่าง</p>
        </section>
        <div className="grid">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} addToCart={addToCart} />
          ))}
        </div>
      </main>
    );
  return (
    <main>
      <section className="page-header">
        <h1>รายละเอียดสินค้า</h1>
        <p>ดูข้อมูลสินค้าเพิ่มเติมก่อนตัดสินใจสั่งซื้อได้ที่นี่</p>
      </section>
      <section className="product-hero">
        <div>
          <h2>สะดวก เลือกซื้อได้ทันที</h2>
          <p>
            หน้ารายละเอียดนี้ออกแบบให้เข้าใจง่าย
            พร้อมข้อมูลครบและปุ่มสั่งซื้อที่ชัดเจน
          </p>
        </div>
      </section>
      <section className="product-detail">
        <div className="product-page-card">
          <div className="product-media-column">
            <div className="product-page-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="comment-card">
              <div className="comment-card-header">
                <h3>ความคิดเห็น</h3>
                <span>{comments.length} รายการ</span>
              </div>
              <div className="comment-list">
                {comments.map((comment) => (
                  <article key={comment.id} className="comment-item">
                    <div className="comment-item-head">
                      <strong>{comment.name}</strong>
                      <span>{comment.time}</span>
                    </div>
                    <p>{comment.message}</p>
                  </article>
                ))}
              </div>
              <form className="comment-form" onSubmit={handleSubmit}>
                <label className="comment-label">เขียนความคิดเห็น</label>
                <textarea
                  className="comment-input comment-input-large"
                  rows="4"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="แชร์ประสบการณ์ของคุณเกี่ยวกับสินค้านี้"
                  maxLength={255}
                />
                <div className="comment-form-footer">
                  <label className="remember-check">
                    <input type="checkbox" /> จำชื่อไว้สำหรับครั้งต่อไป
                  </label>
                  <div className="comment-counter">{255 - draft.length}</div>
                </div>
                <button type="submit" className="primary-btn comment-submit">
                  ส่งความคิดเห็น
                </button>
              </form>
            </div>
          </div>
          <div className="product-page-info">
            <div className="product-badge-row">
              <span className="product-tag">{product.badge}</span>
              <span className="product-shipping">{product.shipping}</span>
            </div>
            <span className="category">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-rating-row">
              <strong>⭐ {product.rating}</strong>
              <span>{product.sold.toLocaleString()} ขายแล้ว</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="price-block">
              <div>
                <div className="product-price">
                  {formatPrice(product.price)}
                </div>
                <div className="old-price">
                  {formatPrice(product.originalPrice)}
                </div>
              </div>
              <div className="promo-badge">ลดทันที 20%</div>
            </div>
            <div className="action-row">
              <button
                className="primary-btn"
                onClick={() => {
                  addToCart(product.id);
                  goTo("checkout");
                }}
              >
                ซื้อเลย
              </button>
              <button
                className="secondary-btn"
                onClick={() => addToCart(product.id)}
              >
                ใส่ตะกร้า
              </button>
            </div>
            <div className="seller-card">
              <h3>ร้านค้า</h3>
              <p>Mellow Shop Store · ตอบกลับเร็ว · ส่งไวภายใน 24 ชั่วโมง</p>
            </div>
            <div className="product-meta-list">
              <div>
                <span>สถานะ</span>
                <strong>พร้อมส่ง</strong>
              </div>
              <div>
                <span>รหัสสินค้า</span>
                <strong>{product.id}</strong>
              </div>
              <div>
                <span>การจัดส่ง</span>
                <strong>ส่งฟรี</strong>
              </div>
            </div>
          </div>
        </div>
        <section className="detail-highlights">
          <article>
            <h3>🚚 ส่งไว</h3>
            <p>จัดส่งภายใน 24 ชั่วโมง</p>
          </article>
          <article>
            <h3>✅ รับประกัน</h3>
            <p>คืนได้ภายใน 7 วัน</p>
          </article>
          <article>
            <h3>💬 ติดต่อง่าย</h3>
            <p>ยินดีตอบคำถามก่อนซื้อ</p>
          </article>
        </section>
      </section>
    </main>
  );
}
