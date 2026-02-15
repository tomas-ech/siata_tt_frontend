
export const UserDeliveries = () => {

    const MOCK_SHIPMENTS= [
  {
    id: "ENV-001",
    product: "Contenedor de Carga",
    quantity: 2,
    destination: "Buenos Aires, Argentina",
    shippingMethod: "mar",
    status: "en_transito",
    orderDate: "2026-02-01",
    estimatedDelivery: "2026-02-25",
    total: 5500,
  },
  {
    id: "ENV-002",
    product: "Equipos Electrónicos",
    quantity: 5,
    destination: "Santiago, Chile",
    shippingMethod: "tierra",
    status: "en_proceso",
    orderDate: "2026-02-10",
    estimatedDelivery: "2026-02-20",
    total: 7125,
  },
  {
    id: "ENV-003",
    product: "Muebles Modernos",
    quantity: 3,
    destination: "Lima, Perú",
    shippingMethod: "mar",
    status: "entregado",
    orderDate: "2026-01-15",
    estimatedDelivery: "2026-02-10",
    total: 2805,
  },
];

  return (
    <div>UserDeliveries</div>
  )
}
