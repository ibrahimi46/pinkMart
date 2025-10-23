import Button from "@/app/components/Button";
import assets from "@/assets";

interface DashboardInfoItemProps {
  name: string;
  count: string;
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

const RecentOrderItem = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <p>
          <b>Order ID:</b> 192876
        </p>
        <div className="bg-orange-100 p-2 flex items-center justify-center rounded-full border border-red-600">
          Rejected
        </div>
      </div>
      <div className="sm:flex sm:justify-between sm:mt-7">
        <p>
          <b>Name</b>: Shirza Poori
        </p>
        <p>
          <b>Date</b>: 19/07/2025
        </p>
        <p>
          <b>Total</b>: $200
        </p>
      </div>
      <hr className="border-t mt-2" />
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="mt-2 flex flex-col gap-6">
      <h1 className="font-semibold">Admin Dashboard</h1>
      <div className="">
        {/** sales user products */}
        <div className="border border-black-200 p-6 gap-2 rounded-2xl flex justify-evenly">
          <DashboardInfoItem name="Sales" count="130" />
          <DashboardInfoItem name="Users" count="956" />
          <DashboardInfoItem name="Products" count="140" />
        </div>
      </div>
      <div className="flex justify-between">
        <h1 className="font-semibold">Recent Orders</h1>
        <Button
          name="View All(+40)"
          icon={assets.icons.arrow_right}
          iconPosition="right"
          textStyles="text-body-sm"
          extraStyles="px-4 border border-primary-600 bg-black-50 h-8"
        />
      </div>

      <div className="border border-black-200 rounded-2xl p-4 flex flex-col gap-8">
        <RecentOrderItem />
        <RecentOrderItem />
        <RecentOrderItem />
      </div>
    </div>
  );
};

export default AdminDashboard;
