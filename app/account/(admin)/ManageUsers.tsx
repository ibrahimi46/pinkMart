import Image from "next/image";
import assets from "@/assets";
import Button from "@/app/components/Button";
import { useContext, useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import { UserDataContext } from "@/app/context/UserDataContext";

interface UserItemProps {
  userId: number;
  fullName: string;
  email: string;
  phone: string | null;
  isAdmin: boolean;
  createdAt: string;
  handleRoleChange: (isAdmin: boolean) => void;
  handleViewDetails: () => void;
}

const UserItem = ({
  userId,
  fullName,
  email,
  phone,
  isAdmin,
  createdAt,
  handleRoleChange,
  handleViewDetails,
}: UserItemProps) => {
  const roleColors = {
    admin: "bg-purple-100 border-purple-600",
    user: "bg-blue-100 border-blue-600",
  };

  return (
    <div className="bg-black-100 rounded-3xl p-4 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 text-body-sm sm:text-body-md">
          <p>
            <b>User #:</b> {userId}
          </p>
          <p>
            <b>Name:</b> {fullName}
          </p>
          <p>
            <b>Email:</b> {email}
          </p>
          {phone && (
            <p>
              <b>Phone:</b> {phone}
            </p>
          )}
          <p>
            <b>Joined:</b> {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-2xl border ${
            roleColors[isAdmin ? "admin" : "user"]
          }`}
        >
          <p className="text-body-sm font-semibold capitalize">
            {isAdmin ? "Admin" : "User"}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={isAdmin ? "admin" : "user"}
          onChange={(e) => handleRoleChange(e.target.value === "admin")}
          className="flex-1 p-2 bg-white rounded-3xl border border-black-200 text-body-sm cursor-pointer"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div
          onClick={handleViewDetails}
          className="flex cursor-pointer items-center gap-2 bg-primary-100 p-2 justify-center rounded-3xl border border-primary-600"
        >
          <Image src={assets.icons.users} height={20} width={20} alt="view" />
          <p className="text-body-sm">View Details</p>
        </div>
      </div>
    </div>
  );
};

interface UserDetailsProps {
  userId: number;
  handleBack: () => void;
}

interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  isAdmin: boolean;
  createdAt: string;
  orders?: {
    id: number;
    totalAmount: number;
    status: string;
    createdAt: string;
  }[];
}

const UserDetails = ({ userId, handleBack }: UserDetailsProps) => {
  const [userDetails, setUserDetails] = useState<AdminUser | null>(null);
  const context = useContext(UserDataContext);
  const { getAdminUserDetails, loading } = context!;

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getAdminUserDetails(userId);
      if (details) {
        console.log("am in manageusers userdetails");
        console.log(details);
        setUserDetails(details);
      }
    };
    fetchDetails();
  }, [userId]);

  return (
    <div className="flex flex-col gap-4">
      {loading || !userDetails ? (
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
            <h1 className="font-semibold">User #{userDetails?.id}</h1>
          </div>

          <div className="bg-white border border-black-200 rounded-3xl p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">User Information</h2>
              <p className="text-body-md">
                <b>Full Name:</b> {userDetails?.fullName}
              </p>
              <p className="text-body-md">
                <b>Email:</b> {userDetails?.email}
              </p>
              {userDetails?.phone && (
                <p className="text-body-md">
                  <b>Phone:</b> {userDetails.phone}
                </p>
              )}
              <p className="text-body-md">
                <b>Role:</b>{" "}
                <span
                  className={`px-2 py-1 rounded-xl ${
                    userDetails?.isAdmin
                      ? "bg-purple-100 text-purple-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {userDetails?.isAdmin ? "Admin" : "User"}
                </span>
              </p>
              <p className="text-body-md">
                <b>Member Since:</b>{" "}
                {new Date(userDetails?.createdAt).toLocaleDateString()}
              </p>
            </div>

            <hr className="border-black-200" />

            <div className="flex flex-col gap-3">
              <h2 className="font-semibold">Recent Orders</h2>
              {userDetails?.orders && userDetails.orders.length > 0 ? (
                userDetails.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center bg-black-100 p-3 rounded-2xl"
                  >
                    <div>
                      <p className="font-semibold text-body-md">
                        Order #{order.id}
                      </p>
                      <p className="text-body-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.totalAmount}</p>
                      <p
                        className={`text-body-sm capitalize ${
                          order.status === "delivered"
                            ? "text-green-600"
                            : order.status === "cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-4">
                  No orders found
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-h6">Total Orders</h2>
              <p className="font-bold text-h6 text-primary-600">
                {userDetails?.orders?.length || 0}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ManageUsers = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [filterRole, setFilterRole] = useState<string>("all");

  const context = useContext(UserDataContext);
  const { adminUsers, fetchAdminUsers, updateUserRole, loading } = context!;

  const handleRoleChange = async (userId: number, isAdmin: boolean) => {
    await updateUserRole(userId, isAdmin);
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const filteredUsers =
    filterRole === "all"
      ? adminUsers
      : adminUsers.filter((user: AdminUser) =>
          filterRole === "admin" ? user.isAdmin : !user.isAdmin
        );

  return (
    <div className="mt-2 flex flex-col gap-6">
      {selectedUserId ? (
        <UserDetails
          userId={selectedUserId}
          handleBack={() => setSelectedUserId(null)}
        />
      ) : (
        <>
          <h1 className="font-semibold">Manage Users</h1>

          <div className="flex gap-2 flex-wrap">
            <Button
              icon={assets.icons.users}
              iconPosition="left"
              name="All Users"
              extraStyles={`${
                filterRole === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterRole("all")}
            />
            <Button
              icon={assets.icons.admin}
              iconPosition="left"
              name="Admins"
              extraStyles={`${
                filterRole === "admin"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterRole("admin")}
            />
            <Button
              icon={assets.icons.users}
              iconPosition="left"
              name="Users"
              extraStyles={`${
                filterRole === "user"
                  ? "bg-primary-600 text-white"
                  : "bg-black-100"
              } p-3 rounded-3xl border border-black-200`}
              textStyles="text-body-sm"
              handleOnClick={() => setFilterRole("user")}
            />
          </div>

          <div className="p-4 rounded-3xl bg-white border border-black-200 flex flex-col gap-4 max-h-[512px] overflow-y-scroll scrollbar-hide">
            {loading ? (
              <Loading />
            ) : (
              <>
                {filteredUsers.length === 0 ? (
                  <p className="text-center text-gray-600 py-8">
                    No users found
                  </p>
                ) : (
                  filteredUsers.map((user: AdminUser) => (
                    <UserItem
                      key={user.id}
                      userId={user.id}
                      fullName={user.fullName}
                      email={user.email}
                      phone={user.phone}
                      isAdmin={user.isAdmin}
                      createdAt={user.createdAt}
                      handleRoleChange={(isAdmin) =>
                        handleRoleChange(user.id, isAdmin)
                      }
                      handleViewDetails={() => setSelectedUserId(user.id)}
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

export default ManageUsers;
