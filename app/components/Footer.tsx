import assets from "@/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="px-6 py-16 md:px-20 sm:flex gap-8 items-start text-body-sm">
      <Image src={assets.logo} height={60} width={60} alt="logo" />
      <div className="sm:flex-1 sm:flex grid grid-cols-2 px-4 gap-4 justify-around max-w-3xl py-2">
        <div className="text-black-400 flex flex-col gap-1 mt-2">
          <h1 className="font-bold text-black-700 mb-2">About</h1>
          <p>About Us</p>
          <p>Our Branches</p>
          <p>Changelog</p>
        </div>
        <div className="text-black-400 flex flex-col gap-1 mt-2">
          <h1 className="font-bold text-black-700 mb-2">Quick Links</h1>
          <p>FAQs</p>
          <p>Recipes</p>
          <p>Contact Us</p>
        </div>
        <div className="text-black-400 flex flex-col gap-1 mt-2">
          <h1 className="font-bold text-black-700 mb-2">Help & Support</h1>
          <p>Terms of Privacy</p>
          <p>Privacy Policy</p>
          <p>Security</p>
        </div>
        <div className="text-black-400 flex flex-col gap-1 mt-2">
          <h1 className="font-bold text-black-700 mb-2">Company</h1>
          <p>Blog</p>
          <p>Contact</p>
        </div>
        <div className="text-black-400 flex flex-col gap-1 mt-2">
          <h1 className="font-bold text-black-700 mb-2">Social</h1>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
