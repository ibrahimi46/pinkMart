import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  name: string;
  icon: string;
  extraStyles?: string;
  iconPosition?: "left" | "right";
  textStyles?: string;
  href: string;
}

const Button = ({
  name,
  icon,
  extraStyles,
  iconPosition,
  textStyles,
  href,
}: ButtonProps) => {
  return (
    <Link href={href}>
      <div
        className={`bg-black-100 py-2 flex 
      items-center justify-center gap-2 rounded-full ${extraStyles}`}
      >
        {iconPosition === "left" && icon && (
          <Image src={icon} height={20} width={20} alt="" />
        )}
        <p className={`font-semibold ${textStyles}`}>{name}</p>
        {iconPosition === "right" && icon && (
          <Image src={icon} height={20} width={20} alt="" />
        )}
      </div>
    </Link>
  );
};

export default Button;
