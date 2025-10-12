import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  name: string;
  icon: string;
  width?: number;
  extraStyles?: string;
  iconPosition?: "left" | "right";
  iconColor?: string;
  textStyles?: string;
}

const Button = ({
  name,
  icon,
  extraStyles,
  iconPosition,
  width,
  iconColor,
  textStyles,
}: ButtonProps) => {
  const wClass = width ? `w-[${width}px]` : "w-[416px]";
  return (
    <Link href="#">
      <div
        className={`bg-primary-600 text-white py-2 px-3 flex 
      items-center justify-center gap-2 rounded-full ${extraStyles} ${wClass}`}
      >
        {iconPosition === "left" && icon && (
          <Image
            className={iconColor}
            src={icon}
            height={20}
            width={20}
            alt=""
          />
        )}
        <p className={`font-semibold ${textStyles}`}>{name}</p>
        {iconPosition === "right" && icon && (
          <Image
            className={iconColor}
            src={icon}
            height={20}
            width={20}
            alt=""
          />
        )}
      </div>
    </Link>
  );
};

export default Button;
