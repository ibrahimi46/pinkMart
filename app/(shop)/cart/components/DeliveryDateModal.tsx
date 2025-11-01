import assets from "@/assets";
import Image from "next/image";

interface DateSelectorProps {
  day: string;
  date: string;
  handleClick: () => void;
  selectedDeliveryDate: string;
}

const DateSelector = ({
  day,
  date,
  handleClick,
  selectedDeliveryDate,
}: DateSelectorProps) => {
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col border cursor-pointer hover:border hover:border-black-700 border-black-100 hover:bg-black-100 transition-all duration-300 
        items-center justify-center bg-black-50 h-[70px] w-20 rounded-xl
        ${selectedDeliveryDate === date ? "border border-black-500" : ""}
        `}
    >
      <p className="text-black-500 text-body-md">{day}</p>
      <p className="text-black-300 text-body-sm">{date}</p>
    </div>
  );
};

interface DeliveryDatesProps {
  date: Date;
  dayName: string;
  dateStr: string;
  fullDate: string;
}
interface DeliveryDateModalProps {
  handleCloseModal: (st: boolean) => void;
  deliveryDates: DeliveryDatesProps[];
  setSelectedDeliveryDate: (date: string) => void;
  selectedDeliveryDate: string;
}

const DeliveryDateModal = ({
  handleCloseModal,
  deliveryDates,
  setSelectedDeliveryDate,
  selectedDeliveryDate,
}: DeliveryDateModalProps) => {
  return (
    <div className="bg-white p-5 w-[550px] h-auto rounded-3xl flex flex-col gap-4 relative border border-black-300">
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
          {deliveryDates.map((item, idx) => {
            return (
              <DateSelector
                key={idx}
                date={item.dateStr}
                day={item.dayName}
                selectedDeliveryDate={selectedDeliveryDate}
                handleClick={() => {
                  setSelectedDeliveryDate(item.fullDate);
                  console.log(selectedDeliveryDate);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDateModal;
