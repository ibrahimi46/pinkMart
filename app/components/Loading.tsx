import assets from "@/assets";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/50 backdrop-blur-sm pointer-events-auto">
      <div className="flex flex-col relative items-center gap-3 px-8 py-8 rounded-3xl">
        <div className="w-16 h-16 border-4 border-t-primary-600 border-b-primary-600 border-l-gray-300 border-r-gray-300 rounded-full animate-spin"></div>
        <Image
          src={assets.logo}
          height={40}
          width={40}
          alt="logo"
          className="absolute top-11 flex items-center"
        />
      </div>
    </div>
  );
};

export default Loading;
