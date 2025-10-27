import Image from "next/image";

interface ButtonProps {
  name: string;
  icon: string;
  extraStyles?: string;
  iconPosition?: "left" | "right";
  textStyles?: string;
  handleOnClick?: () => void;
  btnDisabled?: boolean;
  iconStyle?: string;
}

const Button = ({
  name,
  icon,
  extraStyles,
  iconPosition,
  textStyles,
  btnDisabled,
  handleOnClick,
  iconStyle,
}: ButtonProps) => {
  return (
    <button
      disabled={btnDisabled}
      onClick={() => {
        handleOnClick?.();
      }}
      className={`bg-black-100 py-2 flex 
      items-center justify-center gap-2 rounded-full ${extraStyles}`}
    >
      {iconPosition === "left" && icon && (
        <Image src={icon} height={20} width={20} alt="" className={iconStyle} />
      )}
      <p className={`${textStyles}`}>{name}</p>
      {iconPosition === "right" && icon && (
        <Image src={icon} height={20} width={20} alt="" className={iconStyle} />
      )}
    </button>
  );
};

export default Button;
