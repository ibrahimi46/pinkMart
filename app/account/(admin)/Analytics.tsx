import { useContext, useMemo } from "react";
import { AdminContext } from "@/app/context/AdminContext";
import { ProductsContext } from "@/app/context/ProductsContext";
import Image from "next/image";
import assets from "@/assets";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  bgColor?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  bgColor = "bg-primary-100",
}: StatCardProps) => {
  return (
    <div className="bg-white border border-black-200 rounded-3xl p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-black-400 text-body-md font-semibold">{title}</h3>
        <div className={`${bgColor} p-3 rounded-full`}>
          <Image src={icon} height={24} width={24} alt={title} />
        </div>
      </div>
      <p className="text-body-2xl font-bold">{value}</p>
    </div>
  );
};

interface StatusBreakdownProps {
  status: string;
  count: number;
  total: number;
  color: string;
}

const StatusBreakdown = ({
  status,
  count,
  total,
  color,
}: StatusBreakdownProps) => {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-body-md font-semibold capitalize">{status}</p>
        <p className="text-body-md">
          {count} ({percentage}%)
        </p>
      </div>
      <div className="w-full bg-black-100 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Analytics = () => {
  const adminContext = useContext(AdminContext);
  const productContext = useContext(ProductsContext);
  const { orders, users } = adminContext!;
  const { products } = productContext!;

  const totalRevenue = useMemo(() => {
    if (!orders) return 0;
    return orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
  }, [orders]);

  const totalOrders = orders?.length || 0;
  const totalUsers = users?.length || 0;
  const totalProducts = products.length;

  const statusBreakdown = useMemo(() => {
    if (!orders) return {};
    const breakdown: { [key: string]: number } = {};
    orders.forEach((order) => {
      const status = order.status.toLowerCase();
      breakdown[status] = (breakdown[status] || 0) + 1;
    });
    return breakdown;
  }, [orders]);

  const statusColors: { [key: string]: string } = {
    pending: "bg-yellow-500",
    processing: "bg-blue-500",
    shipped: "bg-purple-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const adminUsers = users.filter((user) => user.isAdmin).length;
  const regularUsers = totalUsers - adminUsers;

  const recentOrders = orders?.slice(0, 5) || [];

  return (
    <div className="mt-2 flex flex-col gap-6 h-screen overflow-y-scroll scrollbar-hide">
      <h1 className="font-semibold text-body-2xl">Analytics & Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={assets.icons.analytics}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={assets.icons.orders}
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={assets.icons.users}
        />
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={assets.icons.products}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-black-200 rounded-3xl p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-body-lg">Order Statistics</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-body-md">Average Order Value</p>
              <p className="text-body-lg font-bold">
                ${averageOrderValue.toFixed(2)}
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              {Object.entries(statusBreakdown).map(([status, count]) => (
                <StatusBreakdown
                  key={status}
                  status={status}
                  count={count}
                  total={totalOrders}
                  color={statusColors[status] || "bg-gray-500"}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-black-200 rounded-3xl p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-body-lg">User Statistics</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-body-md">Total Users</p>
              <p className="text-body-lg font-bold">{totalUsers}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-body-md">Admin Users</p>
              <p className="text-body-lg font-bold">{adminUsers}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-body-md">Regular Users</p>
              <p className="text-body-lg font-bold">{regularUsers}</p>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <StatusBreakdown
                status="Admin"
                count={adminUsers}
                total={totalUsers}
                color="bg-purple-500"
              />
              <StatusBreakdown
                status="Regular"
                count={regularUsers}
                total={totalUsers}
                color="bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-black-200 rounded-3xl p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-body-lg">Recent Orders</h2>
        <div className="flex flex-col gap-4">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 bg-black-100 rounded-2xl"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-body-md">
                    Order #{order.id}
                  </p>
                  <p className="text-black-400 text-body-sm">
                    {order.fullName || `User #${order.userId}`}
                  </p>
                  <p className="text-black-400 text-body-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-bold text-body-lg">
                    ${Number(order.totalAmount).toFixed(2)}
                  </p>
                  <div
                    className={`px-3 py-1 rounded-full text-body-sm capitalize ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-black-400 py-8">No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
