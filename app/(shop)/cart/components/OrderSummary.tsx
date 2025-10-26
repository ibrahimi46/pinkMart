import CheckoutBtn from "./CheckoutBtn";

interface OrderSummaryProps {
  cartTotal: number;
}

const OrderSummary = ({ cartTotal }: OrderSummaryProps) => {
  const deliveryFee = 5.78;
  return (
    <div className="bg-white w-full p-6 rounded-3xl h-72 border border-black-100 flex flex-col gap-4">
      <p className="text-body-sm text-center">
        Free delivery + saving $3.00 on this order...
      </p>
      <h1 className="text-body-lg font-bold">Order Summary</h1>
      <div className="mx-4">
        <div className="flex justify-between">
          <p>Items total</p>
          <p className="text-black-400">${cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery fee</p>
          <p className="text-black-400">${deliveryFee}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <h1 className="text-body-lg font-bold">Subtotal</h1>
        <p className="mr-4">${(cartTotal + deliveryFee).toFixed(2)}</p>
      </div>
      <CheckoutBtn cartTotal={(cartTotal + deliveryFee).toFixed(2)} />
    </div>
  );
};

export default OrderSummary;
