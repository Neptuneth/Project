import { formatPrice } from "../utils/index.js";

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-card-head">
        <span className="product-tag">{product.badge}</span>
        <span className="product-shipping">{product.shipping}</span>
      </div>
      <img src={product.image} alt={product.name} />
      <div className="product-meta">
        <div className="category">{product.category}</div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div className="product-rating">
        <strong>⭐ {product.rating}</strong>
        <span>{product.sold.toLocaleString()} ขายแล้ว</span>
      </div>
      <div className="product-card-footer">
        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          <span className="old-price">
            {formatPrice(product.originalPrice)}
          </span>
        </div>
        <div className="card-buttons">
          <a href={`?page=product&id=${product.id}`} className="secondary-btn">
            ดูรายละเอียด
          </a>
          <button onClick={() => addToCart(product.id)}>ใส่ตะกร้า</button>
        </div>
      </div>
    </article>
  );
}
