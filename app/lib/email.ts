import "dotenv/config"
import assets from "@/assets";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAIL!,
    pass: process.env.USER_MAIL_PASS!,
  },
  logger: true,
  debug: true,
})


interface EmailProps {
  to: string;
  subject: string;
  html: string;
}

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  priceAtPurchase: number;
  imageUrl?: string;
};

interface Order {
  fullName: string;
  orderId: number;
  status: string;
  deliveryDate: string;
  totalAmount: number;
  items: OrderItem[];
}

export async function sendEmail({ to, subject, html }: EmailProps) {
  try {
    const info = await transporter.sendMail({
      from: `"PinkMart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}


type OrderEmailData = {
  orderId: number;
  fullName: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  deliveryDate: string;
};


export async function sendOrderEmail(userEmail: string, orderData: OrderEmailData) {
  const htmlString = generateOrderConfirmationMail(orderData);

  await transporter.sendMail({
    from: `"PinkMart" <${process.env.SMTP_FROM_EMAIL}>`,
    to: userEmail,
    subject: `Order #${orderData.orderId} confirmed!`,
    html: htmlString,
  });
}

export function generateOrderConfirmationMail({
  fullName,
  orderId,
  deliveryDate,
  totalAmount,
  items,
}: Order): string {
  const itemsHtml = items.map((item) => `
    <div style="background-color: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; border: 1px solid #e5e7eb;">
      ${item.imageUrl ? `
        <img 
          src="${item.imageUrl}" 
          width="50" 
          height="50" 
          alt="${item.name}" 
          style="border-radius: 8px; margin-right: 16px; object-fit: cover;"
        />
      ` : ''}
      <div style="flex: 1;">
        <p style="font-size: 14px; font-weight: 600; color: #111827; margin: 0; margin-bottom: 4px;">
          ${item.name}
        </p>
        <p style="font-size: 12px; color: #6b7280; margin: 0;">
          Qty: ${item.quantity} × $${item.priceAtPurchase.toFixed(2)}
        </p>
      </div>
      <p style="font-size: 14px; font-weight: 600; color: #111827; margin: 0;">
        $${(item.quantity * item.priceAtPurchase).toFixed(2)}
      </p>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your PinkMart Order #${orderId} Confirmed!</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9fafb; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 32px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5e7eb;">
          
          <!-- Header -->
          <div style="background-color: #f3e8ff; padding: 24px; text-align: center; border-bottom: 1px solid #e5e7eb;">
            <img src="https://pink-mart.vercel.app/icons/logo.svg" width="120" alt="PinkMart Logo" style="margin: 0 auto;">
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <p style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 16px;">
              Hi ${fullName},
            </p>

            <p style="font-size: 16px; color: #374151; margin-bottom: 24px;">
              Your order has been placed successfully! We're excited to get your items ready for delivery.
            </p>

            <!-- Order Details Card -->
            <div style="background-color: #f9fafb; border-radius: 16px; padding: 20px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
              <p style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">
                Order Details
              </p>

              <div style="margin-bottom: 12px;">
                <p style="font-size: 14px; color: #6b7280; margin: 0;">
                  <strong>Order #:</strong> ${orderId}
                </p>
              </div>

              <div style="margin-bottom: 12px;">
                <p style="font-size: 14px; color: #6b7280; margin: 0;">
                  <strong>Delivery Date:</strong> ${deliveryDate && !isNaN(new Date(deliveryDate).getTime()) ? new Date(deliveryDate).toLocaleDateString() : "To be confirmed"}
                </p>
              </div>

              <div style="margin-bottom: 12px;">
                <p style="font-size: 14px; color: #6b7280; margin: 0;">
                  <strong>Total Amount:</strong> 
                  <span style="color: #9333ea; font-weight: 600;">
                    $${totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

            <!-- Order Items -->
            <p style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px;">
              Order Items
            </p>

            ${itemsHtml}

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

            <!-- Footer Message -->
            <p style="font-size: 14px; color: #374151; margin-bottom: 8px;">
              Thanks for shopping with us!
            </p>
            <p style="font-size: 14px; color: #9333ea; font-weight: 600;">
              — The PinkMart Team
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              © 2024 PinkMart. All rights reserved.
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
}

interface OrderStatusUpdate {
  fullName: string;
  orderId: number;
  status: string;
  deliveryDate?: string;
}

export function generateOrderStatusUpdateMail({
  fullName,
  orderId,
  status,
  deliveryDate,
}: OrderStatusUpdate): string {
  const statusConfig: {
    [key: string]: {
      color: string;
      bgColor: string;
      icon: string;
      message: string;
    };
  } = {
    pending: {
      color: "#ca8a04",
      bgColor: "#fef3c7",
      icon: "⏳",
      message:
        "We've received your order and it's currently being reviewed. We'll start processing it shortly!",
    },
    processing: {
      color: "#2563eb",
      bgColor: "#dbeafe",
      icon: "📦",
      message:
        "Great news! Your order is now being processed. We're carefully preparing your items for shipment.",
    },
    shipped: {
      color: "#9333ea",
      bgColor: "#f3e8ff",
      icon: "🚚",
      message:
        "Your order is on its way! Your package has been handed over to our delivery partner and will arrive soon.",
    },
    delivered: {
      color: "#16a34a",
      bgColor: "#dcfce7",
      icon: "✅",
      message:
        "Your order has been delivered! We hope you love your items. Thanks for shopping with PinkMart!",
    },
    cancelled: {
      color: "#dc2626",
      bgColor: "#fee2e2",
      icon: "❌",
      message:
        "Your order has been cancelled. If you didn't request this, please contact our support team.",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order #${orderId} Status Update: ${status.toUpperCase()}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9fafb; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 32px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5e7eb;">
          
          <!-- Header -->
          <div style="background-color: #f3e8ff; padding: 24px; text-align: center; border-bottom: 1px solid #e5e7eb;">
            <img src="${assets.logo}" width="120" alt="PinkMart Logo" style="margin: 0 auto;">
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <p style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 16px;">
              Hi ${fullName},
            </p>

            <p style="font-size: 16px; color: #374151; margin-bottom: 24px;">
              We have an update on your order!
            </p>

            <!-- Status Card -->
            <div style="background-color: ${config.bgColor}; border-radius: 16px; padding: 24px; border: 2px solid ${config.color}; margin-bottom: 24px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 12px;">
                ${config.icon}
              </div>
              <p style="font-size: 20px; font-weight: 600; color: ${config.color}; margin: 0; margin-bottom: 8px; text-transform: capitalize;">
                ${status}
              </p>
              <p style="font-size: 14px; color: #374151; margin: 0;">
                Order #${orderId}
              </p>
            </div>

            <!-- Message -->
            <div style="background-color: #f9fafb; border-radius: 16px; padding: 20px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
              <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.6;">
                ${config.message}
              </p>
            </div>

            ${deliveryDate && status !== "cancelled" ? `
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
                <p style="font-size: 14px; color: #6b7280; margin: 0;">
                    <strong>Expected Delivery:</strong> ${deliveryDate && !isNaN(new Date(deliveryDate).getTime()) ? new Date(deliveryDate).toLocaleDateString() : "To be confirmed"}
                </p>
              </div>
            ` : ''}

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

            <!-- Footer Message -->
            <p style="font-size: 14px; color: #374151; margin-bottom: 8px;">
              Have questions? Feel free to reach out to us anytime!
            </p>
            <p style="font-size: 14px; color: #9333ea; font-weight: 600;">
              — The PinkMart Team
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              © 2024 PinkMart. All rights reserved.
            </p>
          </div>

        </div>
      </body>
    </html>
  `;
}

export async function sendUpdateStatusEmail(userEmail: string, orderData: OrderStatusUpdate) {
  const htmlString = generateOrderStatusUpdateMail(orderData);

  await transporter.sendMail({
    from: `"PinkMart" <${process.env.SMTP_FROM_EMAIL}>`,
    to: userEmail,
    subject: `Order #${orderData.orderId} confirmed!`,
    html: htmlString,
  });
}