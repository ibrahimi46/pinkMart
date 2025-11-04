import Image from "next/image";
import assets from "@/assets";
import Button from "@/app/components/Button";
import { useContext, useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import { UserDataContext } from "@/app/context/UserDataContext";
import { sendUpdateStatusEmail } from "@/app/lib/email";

interface OrderItemProps {
  orderId: number;
  userId: number;
  total: number;
  status: string;
  email: string;
  createdAt: string;
  fullName: string;
  deliveryDate: string | null;
  itemCount: number;
  handleStatusChange: (status: string) => void;
  handleViewDetails: () => void;
}

const OrderItem = ({
  orderId,
  userId,
  total,
  status,
  email,
  createdAt,
  deliveryDate,
  fullName,
  itemCount,
  handleStatusChange,
  handleViewDetails,
}: OrderItemProps) => {
  const statusColors: { [key: string]: string } = {
    pending: "bg-yellow-100 border-yellow-600",
    processing: "bg-blue-100 border-blue-600",
    shipped: "bg-purple-100 border-purple-600",
    delivered: "bg-green-100 border-green-600",
    cancelled: "bg-red-100 border-red-600",
  };

  return (
    <div className="bg-black-100 rounded-3xl p-4 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 text-body-sm sm:text-body-md">
          <p>
            <b>Order #:</b> {orderId}
          </p>
          <p>
            <b>User ID:</b> {userId}
          </p>
          <p>
            <b>Items:</b> {itemCount}
          </p>
          <p>
            <b>Total:</b> ${total}
          </p>
          <p>
            <b>Date:</b> {new Date(createdAt).toLocaleDateString()}
          </p>
          {deliveryDate && (
            <p>
              <b>Delivery:</b> {new Date(deliveryDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div
          className={`px-3 py-1 rounded-2xl border ${
            statusColors[status] || "bg-gray-100 border-gray-600"
          }`}
        >
          <p className="text-body-sm font-semibold capitalize">{status}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={status}
          onChange={async (e) => {
            handleStatusChange(e.target.value);
            await fetch("/api/admin/orders/send-status-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: email,
                orderData: {
                  fullName,
                  orderId,
                  status: e.target.value,
                  deliveryDate,
                },
              }),
            });
          }}
          className="flex-1 p-2 bg-white rounded-3xl border border-black-200 text-body-sm cursor-pointer"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div
          onClick={handleViewDetails}
          className="flex cursor-pointer items-center gap-2 bg-primary-100 p-2 justify-center rounded-3xl border border-primary-600"
        >
          <Image src={assets.icons.orders} height={20} width={20} alt="view" />
          <p className="text-body-sm">View Details</p>
        </div>
      </div>
    </div>
  );
};

interface OrderDetailsProps {
  orderId: number;
  handleBack: () => void;
}

interface AdminOrder {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  email?: string;
  fullName?: string;
  deliveryDate: string | null;
  createdAt: string;
  itemCount: number;
  items?: {
    id: number;
    productName: string;
    currentPrice: number;
    quantity: number;
    imageUrl?: string;
  }[];
}

const OrderDetails = ({ orderId, handleBack }: OrderDetailsProps) => {
  const [orderDetails, setOrderDetails] = useState<AdminOrder | null>(null);
  const context = useContext(UserDataContext);
  const { getOrderDetails, loading } = context!;

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getOrderDetails(orderId);
      if (details) {
        setOrderDetails({
          ...details,
          totalAmount: Number(details.totalAmount),
        });
      }
    };
    fetchDetails();
  }, [orderId]);

  return (
    <div className="flex flex-col gap-4">
      {loading || !orderDetails ? (
        <Loading />
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <div
              onClick={handleBack}
              className="cursor-pointer bg-black-100 p-2 rounded-full border border-black-200"
            >
              <Image
                src={assets.icons.arrow_left}
                height={20}
                width={20}
                alt="back"
              />
            </div>
            <h1 className="font-semibold">Order #{orderDetails?.id}</h1>
          </div>

          <div className="border border-black-200 rounded-3xl p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Order Information</h2>
              <p className="text-body-md">
                <b>User ID:</b> {orderDetails?.userId}
              </p>
              <p className="text-body-md">
                <b>Status:</b> {orderDetails?.status}
              </p>
              <p className="text-body-md">
                <b>Total Amount:</b> ${orderDetails?.totalAmount}
              </p>
              {orderDetails?.deliveryDate && (
                <p className="text-body-md">
                  <b>Delivery Date:</b>{" "}
                  {new Date(orderDetails?.deliveryDate).toLocaleDateString()}
                </p>
              )}
            </div>

            <hr className="border-black-200" />

            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Order Items</h2>
              {orderDetails?.items &&
                orderDetails.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-black-100 p-3 rounded-2xl"
                  >
                    <div className="flex gap-3 items-center">
                      <Image
                        src={item.imageUrl || assets.logo}
                        height={50}
                        width={50}
                        alt={item.productName}
                        className="rounded-xl"
                      />
                      <div>
                        <p className="font-semibold text-body-md">
                          {item.productName}
                        </p>
                        <p className="text-body-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">${item.currentPrice}</p>
                  </div>
                ))}
            </div>

            <hr className="border-black-200" />

            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-h6">Total</h2>
              <p className="font-bold text-h6 text-primary-600">
                ${orderDetails?.totalAmount}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ManageOrders = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const context = useContext(UserDataContext);
  const { adminOrders, fetchAdminOrders, updateOrderStatus, loading } =
    context!;

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
  };

  useEffect(() => {
    console.log(adminOrders);
  }, []);

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  const filteredOrders =
    filterStatus === "all"
      ? adminOrders
      : adminOrders.filter(
          (order: AdminOrder) => order.status === filterStatus
        );

  return (
    <div className="mt-2 flex flex-col gap-6">
      {selectedOrderId ? (
        <OrderDetails
          orderId={selectedOrderId}
          handleBack={() => setSelectedOrderId(null)}
        />
      ) : (
        <>
          <h1 className="font-semibold">Manage Orders</h1>

          <div className="flex gap-2 flex-wrap">
            <Button
              icon={assets.icons.orders}
              iconPosition="left"
              name="All Orders"
              extraStyles={`${
                filterStatus === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterStatus("all")}
            />
            <Button
              icon={assets.icons.pending}
              iconPosition="left"
              name="Pending"
              extraStyles={`${
                filterStatus === "pending"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterStatus("pending")}
            />
            <Button
              icon={assets.icons.processing}
              iconPosition="left"
              name="Processing"
              extraStyles={`${
                filterStatus === "processing"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterStatus("processing")}
            />
            <Button
              icon={assets.icons.shipping}
              iconPosition="left"
              name="Shipped"
              extraStyles={`${
                filterStatus === "shipped"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterStatus("shipped")}
            />
            <Button
              icon={assets.icons.delivered}
              iconPosition="left"
              name="Delivered"
              extraStyles={`${
                filterStatus === "delivered"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterStatus("delivered")}
            />
          </div>

          <div className="p-4 rounded-3xl bg-white border border-black-200 flex flex-col gap-4 max-h-[512px] overflow-y-scroll scrollbar-hide">
            {loading ? (
              <Loading />
            ) : (
              <>
                {filteredOrders.length === 0 ? (
                  <p className="text-center text-gray-600 py-8">
                    No orders found
                  </p>
                ) : (
                  filteredOrders.map((order: AdminOrder) => (
                    <OrderItem
                      key={order.id}
                      orderId={order.id}
                      userId={order.userId}
                      total={order.totalAmount}
                      status={order.status}
                      createdAt={order.createdAt}
                      fullName={order.fullName!}
                      email={order.email!}
                      deliveryDate={order.deliveryDate}
                      itemCount={order.itemCount}
                      handleStatusChange={(newStatus) =>
                        handleStatusChange(order.id, newStatus)
                      }
                      handleViewDetails={() => setSelectedOrderId(order.id)}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageOrders;
