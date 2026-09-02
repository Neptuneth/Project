export const formatPrice = (value) => `฿${value.toLocaleString("en-US")}`;

export function goTo(page, id) {
  const params = new URLSearchParams({ page });
  if (id) params.set("id", id);
  window.history.pushState({}, "", `?${params}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
