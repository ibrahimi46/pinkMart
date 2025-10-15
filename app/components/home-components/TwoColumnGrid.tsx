import Image from "next/image";
import assets from "@/assets";

const images = [
  assets.home.two_column_grid.frame1,
  assets.home.two_column_grid.frame2,
  assets.home.two_column_grid.frame3,
  assets.home.two_column_grid.frame4,
  assets.home.two_column_grid.frame5,
];

const TwoColumnGrid = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex animate-marquee gap-2">
        {[...images, ...images].map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 h-[200px] w-[200px] md:w-auto"
          >
            <Image
              src={img}
              height={600}
              width={400}
              alt="frame1"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwoColumnGrid;
