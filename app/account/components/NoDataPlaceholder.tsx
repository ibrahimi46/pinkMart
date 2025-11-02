import Image from "next/image";
import Button from "@/app/components/Button";
import Link from "next/link";

interface NoDataPlaceholderProps {
  icon: string;
  field1: string;
  field2: string;
  btnIcon?: string;
  btnName: string;
  handleAction?: () => void;
  navigateTo?: string;
  withNavigate?: boolean;
}

const NoDataPlaceholder = ({
  icon,
  field1,
  field2,
  btnIcon,
  btnName,
  navigateTo,
  withNavigate,
  handleAction,
}: NoDataPlaceholderProps) => {
  return (
    <div
      className={`flex flex-col items-center gap-3 border bg-white border-black-200 rounded-2xl p-6 w-full`}
    >
      <div className="bg-primary-100 p-3 rounded-full">
        <Image src={icon} height={40} width={40} alt="receipt" />
      </div>
      <h2 className="font-semibold">{field1}</h2>
      <p className="text-black-300 text-body-sm">{field2}</p>
      {withNavigate && navigateTo ? (
        <Link href={navigateTo}>
          <Button
            name={btnName}
            icon={btnIcon!}
            iconPosition="left"
            extraStyles="bg-primary-600 p-4"
            textStyles="text-body-md text-black-100 font-regular"
            iconStyle="filter invert"
            handleOnClick={() => handleAction?.()}
          />
        </Link>
      ) : (
        <Button
          name={btnName}
          icon={btnIcon!}
          iconPosition="left"
          extraStyles="bg-primary-600 p-4"
          textStyles="text-body-md text-black-100 font-regular"
          iconStyle="filter invert"
          handleOnClick={() => handleAction?.()}
        />
      )}
    </div>
  );
};

export default NoDataPlaceholder;
