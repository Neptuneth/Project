import { products } from "../utils/data.js";
import ProductCard from "../components/ProductCard.jsx";

const categories = [...new Set(products.map((product) => product.category))];

export default function Home({
  search,
  setSearch,
  filter,
  setFilter,
  addToCart,
}) {
  const filtered = products.filter(
    (product) =>
      (filter === "all" || product.category === filter) &&
      [product.name, product.description, product.category].some((text) =>
        text.toLowerCase().includes(search.toLowerCase()),
      ),
  );
  return (
    <main>
      <section className="promo-strip">
        <span>🎁 โปรโมชั่นปลายเดือน</span>
        <span>สินค้าตัวใหม่พร้อมส่งใน 24 ชั่วโมง</span>
        <span>รับประกันความพอใจ 7 วัน</span>
      </section>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">ร้านค้าออนไลน์ที่พร้อมให้คุณช้อปสนุก</p>
          <h1>ค้นหาสินค้าที่คุณรักได้ในหนึ่งหน้า</h1>
          <p>
            เว็บ E-commerce ตัวอย่างที่ออกแบบให้ดูทันสมัย มีฟีเจอร์ค้นหา
            แบ่งหมวดหมู่ ตะกร้า และหน้ารายละเอียดสินค้าแบบครบวงจร
          </p>
          <div className="hero-actions">
            <a href="?page=product" className="primary-btn">
              เลือกซื้อเลย
            </a>
            <a href="?page=about" className="secondary-btn">
              ดูจุดเด่นของร้าน
            </a>
          </div>
          <div className="hero-badges">
            <span>🚚 ส่งไว</span>
            <span>⭐ 4.8/5 จากลูกค้า</span>
            <span>🔒 ปลอดภัย</span>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
            alt="Shopping"
          />
        </div>
      </section>
      <section className="stats-grid">
        <article>
          <strong>1,200+</strong>
          <p>คำสั่งซื้อสำเร็จ</p>
        </article>
        <article>
          <strong>24 ชม.</strong>
          <p>จัดส่งเร็ว</p>
        </article>
        <article>
          <strong>7 วัน</strong>
          <p>คืนสินค้าได้</p>
        </article>
      </section>
      <section className="shop-categories">
        <div className="section-header">
          <div>
            <p className="eyebrow">หมวดหมู่แนะนำ</p>
            <h2>เลือกสินค้าตามความต้องการ</h2>
          </div>
        </div>
        <div className="category-chips">
          <button
            className={`category-chip ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            ทั้งหมด
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${filter === category ? "active" : ""}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <section className="deal-banner">
        <div>
          <p className="eyebrow">Flash deal</p>
          <h3>ลดสูงสุด 30% สำหรับสินค้าหลักของร้าน</h3>
          <p>ช้อปก่อนใคร และรับประโยชน์จากโปรโมชั่นพิเศษในช่วงนี้</p>
        </div>
        <a href="?page=product" className="primary-btn">
          ดูสินค้าลดราคา
        </a>
      </section>
      <section className="product-list" id="products">
        <div className="section-header">
          <div>
            <p className="eyebrow">สินค้าขายดี</p>
            <h2>สินค้าแนะนำสำหรับคุณ</h2>
          </div>
          <div className="sort-row">
            <label htmlFor="categoryFilter">หมวดหมู่:</label>
            <select
              id="categoryFilter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option value="all">ทั้งหมด</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid">
          {filtered.length ? (
            filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="empty-state">
              ไม่พบสินค้าตามที่ค้นหา ลองเปลี่ยนคำค้นหรือหมวดหมู่ดู
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
