import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex items-center justify-center px-4 mt-28 flex-col">
      <Image
        src="/images/not-found-image.png"
        height={250}
        width={250}
        alt="not-found-image"
      />
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-h6 text-primary-600 font-semibold">
          Page not found
        </h1>
        <p className="">
          The page you&apos;re looking for isn&apos;t available. Try to search
          <br /> again or use the go back button below.
        </p>
        <Link href={"/"}>
          <button className="bg-primary-600 text-white font-semibold py-2 px-40 rounded-lg">
            Go To Store
          </button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
