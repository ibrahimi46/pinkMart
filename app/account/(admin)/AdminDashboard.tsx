import { AdminContext } from "@/app/context/AdminContext";
import { ProductsContext } from "@/app/context/ProductsContext";
import { useContext } from "react";

interface DashboardInfoItemProps {
  name: string;
  count: number;
}

interface RecentOrderItemProps {
  id: number;
  userId: number;
  fullName?: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const DashboardInfoItem = ({ name, count }: DashboardInfoItemProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="bg-primary-100 flex items-center justify-center  sm:p-12 p-7 rounded-3xl text-body-2xl font-bold">
        {count}
      </div>
      <h1 className="font-semibold">{name}</h1>
    </div>
  );
};

const RecentOrderItem = ({
  id,
  userId,
  fullName,
  totalAmount,
  status,
  createdAt,
}: RecentOrderItemProps) => {
  const statusColors: { [key: string]: string } = {
    pending: "bg-yellow-100 border-yellow-600 text-yellow-800",
    processing: "bg-blue-100 border-blue-600 text-blue-800",
    shipped: "bg-purple-100 border-purple-600 text-purple-800",
    delivered: "bg-green-100 border-green-600 text-green-800",
    cancelled: "bg-red-100 border-red-600 text-red-800",
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p>
          <b>Order ID:</b> {id}
        </p>
        <div
          className={`px-3 py-1 rounded-full border ${
            statusColors[status] || "bg-gray-100 border-gray-600 text-gray-800"
          }`}
        >
          {status}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <p>
          <b>Name</b>: {fullName}
        </p>
        <p>
          <b>User ID</b>: {userId}
        </p>
        <p>
          <b>Date</b>: {new Date(createdAt).toLocaleDateString()}
        </p>
        <p>
          <b>Total</b>: {`$${Number(totalAmount).toFixed(2)}`}
        </p>
      </div>
      <hr className="border-t mt-2" />
    </div>
  );
};

const AdminDashboard = () => {
  const productContext = useContext(ProductsContext);
  const adminContext = useContext(AdminContext);
  const { users, orders } = adminContext!;
  const { products } = productContext!;

  const userCount = users?.length || 0;
  const salesCount = orders?.length || 0;
  const productsCount = products.length || 0;

  return (
    <div className="mt-2 flex flex-col gap-6 h-screen overflow-y-scroll scrollbar-hide">
      <h1 className="font-semibold text-body-2xl">Admin Dashboard</h1>
      <div className="border bg-white border-black-200 p-6 gap-2 rounded-2xl flex justify-evenly">
        <DashboardInfoItem name="Users" count={userCount} />
        <DashboardInfoItem name="Products" count={productsCount} />
        <DashboardInfoItem name="Sales" count={salesCount} />
      </div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-body-2xl">Recent Orders</h1>
      </div>
      <div className="border bg-white border-black-200 rounded-2xl p-4 text-body-md flex flex-col gap-8">
        {orders && orders.length > 0 ? (
          orders.map((order) => {
            return (
              <RecentOrderItem
                key={order.id}
                id={order.id}
                userId={order.userId}
                totalAmount={order.totalAmount}
                status={order.status}
                fullName={order.fullName}
                createdAt={order.createdAt}
              />
            );
          })
        ) : (
          <p className="text-center text-black-400 py-8">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
