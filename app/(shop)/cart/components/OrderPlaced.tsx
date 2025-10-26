import Image from "next/image";
import assets from "@/assets";
import BackButton from "@/app/components/BackButton";

interface OrderPlacedProps {
  handleStepBack: (step?: string) => void;
}

const OrderPlaced = ({ handleStepBack }: OrderPlacedProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl border border-black-100">
        <div className="mb-4">
          <BackButton handleBack={() => handleStepBack()} />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-body-xl">Order In Progress</h1>
            <p className="text-black-500 text-body-md">
              Order Arrives at Apr 5,2022
            </p>
          </div>
          <div className="bg-black-100 flex items-center justify-center px-4 h-10 border border-primary-600 text-primary-600 rounded-full ">
            In Progress
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-green-200 rounded-full p-6">
              <Image
                src={assets.icons.green_tickmark}
                height={50}
                width={50}
                alt="tick"
              />
            </div>
            <h1 className="font-bold">Order is Placed</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border border-black-100 rounded-3xl p-4">
        <h2 className="text-black-400 font-bold text-body-md">Items Name</h2>
      </div>
    </div>
  );
};

export default OrderPlaced;
