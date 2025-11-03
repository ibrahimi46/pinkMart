import Image from "next/image";
import assets from "@/assets";
import { useState } from "react";
import Link from "next/link";

interface HelpItemProps {
  title: string;
  description: string;
  icon: string;
  navigateTo: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

const HelpItem = ({ title, description, icon, navigateTo }: HelpItemProps) => {
  return (
    <Link href={navigateTo || "#"}>
      <div className="flex justify-between border border-black-300 p-4 bg-white rounded-2xl items-center hover:border-primary-600 transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="bg-primary-100 rounded-2xl p-3 flex items-center justify-center">
            <Image src={icon} height={24} width={24} alt={title} />
          </div>
          <div>
            <h1 className="font-bold text-body-md">{title}</h1>
            <p className="text-black-400 font-medium text-body-sm">
              {description}
            </p>
          </div>
        </div>
        <Image
          src={assets.icons.arrow_right}
          height={16}
          width={16}
          alt="arrow"
        />
      </div>
    </Link>
  );
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-black-300 bg-white rounded-2xl">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-body-md">{question}</h3>
        <Image
          src={assets.icons.arrow_right}
          height={16}
          width={16}
          alt="toggle"
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-black-400 text-body-sm">{answer}</p>
        </div>
      )}
    </div>
  );
};

const HelpCenter = () => {
  const faqData = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products, add to cart, proceed to checkout, and complete your payment details to place an order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, PayPal, and other secure payment methods available in your region.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You can return items within 30 days of delivery for a full refund. Items must be unused and in original packaging.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Check your order status in your account dashboard or use the tracking link sent to your email.",
    },
  ];

  const helpItems = [
    {
      title: "Order Tracking",
      description: "Track your package in real-time",
      icon: assets.icons.location,
      navigateTo: "orders",
    },
    {
      title: "Returns & Refunds",
      description: "Start a return or check refund status",
      icon: assets.icons.arrow_left,
      navigateTo: "returns",
    },
    {
      title: "Account Help",
      description: "Update your profile and preferences",
      icon: assets.icons.account,
      navigateTo: "account-details",
    },
  ];

  return (
    <div className="flex flex-col gap-6 mt-2 pb-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-body-2xl">Help Center</h1>
        <p className="text-black-400 text-body-md">
          Get help with your orders, account, and more
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-body-lg">Quick Help</h2>
        <div className="grid gap-3">
          {helpItems.map((item, index) => (
            <HelpItem
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              navigateTo={item.navigateTo}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-body-lg">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-3">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      <div className="border border-primary-600 bg-primary-50 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600 rounded-full p-2">
            <Image
              src={assets.icons.phone}
              height={20}
              width={20}
              alt="contact"
              className="filter invert"
            />
          </div>
          <div>
            <h3 className="font-bold text-body-md">Need more help?</h3>
            <p className="text-black-400 text-body-sm">
              Contact our customer support team
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <button className="bg-primary-600 text-white px-4 py-2 rounded-2xl text-body-sm font-medium">
            Call Support
          </button>
          <button className="bg-white border border-primary-600 text-primary-600 px-4 py-2 rounded-2xl text-body-sm font-medium">
            Email Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
