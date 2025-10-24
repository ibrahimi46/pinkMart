import Image from "next/image";
import assets from "@/assets";

const Loading = () => {
  return (
    <div className="bg-primary-50 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 bg-white px-10 py-5 rounded-3xl">
        <div className="flex items-center">
          <Image src={assets.logo} width={50} height={50} alt="" />
          <h1 className="text-h7 text-primary-600 font-bold">PinkMart</h1>
        </div>
        <p>We are customizing your experience...</p>
        <div className="bg-black-100 h-3 rounded-full w-4/5">
          <div
            className="bg-primary-700 h-3 rounded-full transition-all duration-300"
            style={{ width: "80px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
