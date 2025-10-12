import Image from "next/image";

const NotFound = () => {
  return (
    <main className="flex items-center justify-center px-4 h-screen flex-col">
      <Image
        src="/images/not-found-image.png"
        height={270}
        width={270}
        alt="not-found-image"
      />
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-h5 text-primary-600 font-semibold">
          Page not found
        </h1>
        <p className="">
          The page you're looking for isn't available. Try to search
          <br /> again or use the go back button below.
        </p>
        <button className="bg-primary-600 text-white font-semibold py-2 px-40 rounded-lg">
          Start for free
        </button>
      </div>
    </main>
  );
};

export default NotFound;
