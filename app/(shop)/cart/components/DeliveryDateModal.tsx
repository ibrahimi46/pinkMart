import assets from "@/assets";
import Image from "next/image";

interface DateSelectorProps {
  day: string;
  date: string;
}

interface TimeSelectorProps {
  time: string;
}

const DateSelector = ({ day, date }: DateSelectorProps) => {
  return (
    <div className="flex flex-col border cursor-pointer hover:border hover:border-black-700 border-black-100 hover:bg-black-100 transition-all duration-300 items-center justify-center bg-black-50 h-[70px] w-20 rounded-xl">
      <p className="text-black-500 text-body-md">{day}</p>
      <p className="text-black-300 text-body-sm">{date}</p>
    </div>
  );
};

const TimeSelector = ({ time }: TimeSelectorProps) => {
  return (
    <div className="border hover:border hover:border-black-700  hover:bg-black-100 transition-all duration-300 cursor-pointer border-black-100 text-nowrap w-20 flex justify-center py-2 rounded-3xl">
      <p className="text-body-sm font-semibold">{time}</p>
    </div>
  );
};

interface DeliveryDateModalProps {
  handleCloseModal: (st: boolean) => void;
}

const DeliveryDateModal = ({ handleCloseModal }: DeliveryDateModalProps) => {
  return (
    <div className="bg-white p-5 w-[550px] h-auto rounded-3xl flex flex-col gap-4 relative">
      <div
        onClick={() => handleCloseModal(false)}
        className="absolute  right-3 top-4 border hover:border hover:border-black-700 border-black-100 hover:bg-black-100 transition-all duration-300 p-2 rounded-full cursor-pointer"
      >
        <Image src={assets.icons.close} height={20} width={20} alt="close" />
      </div>
      <h1 className="text-body-2xl font-semibold">Choose your delivery date</h1>
      <hr />
      <div>
        <p className="text-body-md mb-4">Select date</p>
        <div className="flex flex-wrap gap-4  font-semibold">
          <DateSelector day="Mon" date="08/07" />
          <DateSelector day="Mon" date="08/07" />
          <DateSelector day="Mon" date="08/07" />
          <DateSelector day="Mon" date="08/07" />
          <DateSelector day="Mon" date="08/07" />
          <DateSelector day="Mon" date="08/07" />
          <DateSelector day="Mon" date="08/07" />
        </div>
      </div>
      <p className="text-body-md">Select delivery time slot on 07 August</p>
      <div className="flex flex-wrap gap-3">
        <TimeSelector time="12:00 PM" />
        <TimeSelector time="12:00 PM" />
        <TimeSelector time="12:00 PM" />
        <TimeSelector time="12:00 PM" />
      </div>
    </div>
  );
};

export default DeliveryDateModal;
