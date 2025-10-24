import Image from "next/image";
import assets from "@/assets";

const Loading = () => {
  return (
    <div className="h-96 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 bg-white px-10 py-5 rounded-3xl">
        <div className="flex items-center"></div>
        <div className="w-12 h-12 border-4 border-t-primary-600 border-b-primary-600 border-l-gray-300 border-r-gray-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
