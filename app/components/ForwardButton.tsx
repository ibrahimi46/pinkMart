import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";

interface ForwardButtonProps {
  handleForward?: () => void;
}

const ForwardButton = ({ handleForward, ...props }: ForwardButtonProps) => {
  return (
    <>
      <Link
        onClick={(e) => {
          e.preventDefault;
          handleForward?.();
        }}
        href="#"
        className="flex items-center justify-center h-8 w-8 rounded-full border border-black-200 hover:border-black-600 hover:border transition-all duration-200"
      >
        <Image src={assets.icons.arrow_right} width={20} height={20} alt="" />
      </Link>
    </>
  );
};

export default ForwardButton;
