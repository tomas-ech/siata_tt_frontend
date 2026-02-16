export const calculateDeliveryDetails = (
  price: number,
  amount: number,
  method: "mar" | "tierra",
) => {
  const subtotal = price * amount;
  const rate = method === "mar" ? 0.03 : 0.05;
  const discount = amount > 10 ? subtotal * rate : 0.0;

  const total = subtotal - discount;

  return { subtotal, discount, total, rate };
};