const STORAGE_KEY = "shoppe-cart";

export function loadCart() {
  try {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Map(
      entries
        .map(([id, quantity]) => [Number(id), Number(quantity)])
        .filter(([id, quantity]) => Number.isInteger(id) && quantity > 0),
    );
  } catch {
    return new Map();
  }
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...cart]));
}

export function getCartCount(cart) {
  return [...cart.values()].reduce((total, quantity) => total + quantity, 0);
}

export function getCartTotal(cart, products) {
  return [...cart.entries()].reduce(
    (total, [id, quantity]) =>
      total +
      (products.find((product) => product.id === id)?.price || 0) * quantity,
    0,
  );
}
