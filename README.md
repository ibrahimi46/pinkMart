# 🛒 PinkMart - Modern E-Commerce Grocery Store

A full-featured e-commerce grocery store built with Next.js, TypeScript, Tailwind CSS, PostgreSQL (via Drizzle ORM), and Stripe. Includes user authentication, shopping cart, payment integration, and an admin dashboard for product and order management.

🔗 **Live Demo:** [pink-mart.vercel.app](https://pink-mart.vercel.app)

## ✨ Features

### 👤 User Features

#### Authentication & Account Management

- **Multiple Login Options**: Sign in with email, phone number, or Google OAuth
- **Flexible Sign Up**: Register with either email or phone number
- **Profile Management**:
  - Edit account details (name, email, phone)
  - Upload and manage profile picture
  - View and update delivery addresses
- **User Onboarding**: Interactive multi-step onboarding process for new users

#### Shopping Experience

- **Product Browsing**:
  - Browse products by category
  - Search functionality with real-time filtering
  - Advanced filters (price range, stock availability)
  - Product cards with images, prices, and stock information
- **Category-Based Sections**:
  - Dynamic category sections on homepage
  - Top 35 best-selling products based on purchase count
  - Category-specific product displays
- **Shopping Cart**:
  - Add/remove items
  - Update quantities
  - Real-time cart total calculation
  - Persistent cart across sessions

#### Checkout & Orders

- **Checkout Process**:
  - Delivery date selection (excludes weekends)
  - Address selection/management
  - Order summary with items, delivery fee, and total
- **Payment Integration**: Stripe payment processing
- **Order Management**:
  - View order history
  - Track order status (Pending, Processing, Shipped, Delivered, Cancelled)
  - Order details with delivery information
- **Email Notifications**:
  - Order confirmation emails
  - Order status update emails
  - Beautiful HTML email templates

#### Address Management

- **Multiple Addresses**: Add, edit, and delete delivery addresses
- **Address Types**: Home, Work, Villa options
- **Default Address**: Set default delivery address
- **Reverse Geocoding**: Automatic location-based address suggestions

### 👨‍💼 Admin Features

#### Dashboard & Analytics

- **Analytics Dashboard**:
  - Sales analytics and reports
  - User statistics
  - Product performance metrics
  - Revenue tracking

#### Product Management

- **CRUD Operations**:
  - Add new products with images
  - Edit product details (name, price, description, stock, category)
  - Delete products
  - Stock management
- **Product Features**:
  - Image upload via Cloudinary
  - Category assignment
  - Price management (current and old price)
  - Stock tracking

#### Order Management

- **Order Overview**: View all customer orders
- **Order Status Updates**:
  - Update order status
  - Send status update emails to customers
  - Track order fulfillment

#### User Management

- **User Administration**:
  - View all registered users
  - View user details and order history
  - Toggle admin privileges
  - Manage user roles

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Modern UI**: Clean, purple/pink themed design with smooth animations
- **Loading States**: Comprehensive loading indicators throughout the app
- **Error Handling**: User-friendly error messages and validation
- **Search Functionality**: Real-time product search with filtering
- **Category Navigation**: Easy category browsing with visual icons
- **Help Center**: FAQ section for customer support

### 🔧 Technical Features

- **State Management**: React Context API for global state
- **API Routes**: RESTful API endpoints for all operations
- **Database**: PostgreSQL with Drizzle ORM
- **Image Storage**: Cloudinary integration for product and profile images
- **Email Service**: Nodemailer for transactional emails
- **Payment Gateway**: Stripe integration with webhook support
- **Authentication**: JWT tokens and NextAuth for Google OAuth
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons & Assets**: Custom SVG assets

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth, JWT
- **Payment**: Stripe
- **Email**: Nodemailer
- **Image Upload**: Cloudinary

### Development Tools

- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm

## 📦 Installation

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image uploads)
- Stripe account (for payments)
- Gmail account (for email service)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pink-mart
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=your_postgresql_connection_string

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_SUCCESS_URL=http://localhost:3000/cart?page=order_placed
   NEXT_PUBLIC_STRIPE_CANCEL_URL=http://localhost:3000/cart?page=order_failed

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Email (Nodemailer)
   USER_MAIL=your_gmail_address
   USER_MAIL_PASS=your_gmail_app_password
   SMTP_FROM_EMAIL=your_sender_email

   # Base URL (optional)
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up the database**

   ```bash
   # Run migrations (if using Drizzle migrations)
   npm run db:migrate
   ```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
pink-mart/
├── app/
│   ├── (shop)/              # Shop routes
│   │   └── cart/            # Shopping cart pages
│   ├── account/             # User account pages
│   │   ├── (admin)/         # Admin-only pages
│   │   └── components/      # Account components
│   ├── api/                 # API routes
│   │   ├── admin/           # Admin API endpoints
│   │   ├── auth/            # Authentication endpoints
│   │   ├── cart/            # Cart management
│   │   ├── checkout/        # Checkout processing
│   │   ├── orders/          # Order management
│   │   ├── products/        # Product CRUD
│   │   ├── users/           # User management
│   │   └── webhook/         # Stripe webhooks
│   ├── auth/                # Authentication pages
│   ├── categories/          # Category browsing
│   ├── components/          # Shared components
│   ├── context/             # React Context providers
│   ├── lib/                 # Utilities (email, etc.)
│   ├── onboarding/          # Onboarding flow
│   └── utils/               # Helper functions
├── db/                      # Database configuration
│   ├── schema.ts            # Database schema
│   └── index.ts             # Database connection
├── public/                  # Static assets
│   ├── icons/              # SVG icons
│   └── images/             # Product images
├── types/                   # TypeScript type definitions
└── package.json
```

## 🔑 Key Features Breakdown

### Authentication Flow

- Users can sign up with email or phone number
- Password creation with validation requirements
- Login with email/phone + password
- Google OAuth integration
- JWT-based session management

### Shopping Cart System

- Add products to cart with quantity selection
- Real-time cart total calculation including delivery fee
- Cart persists across sessions
- Remove items functionality

### Checkout Process

1. Select delivery date (weekdays only)
2. Choose or add delivery address
3. Review order summary
4. Proceed to Stripe payment
5. Webhook processes order and sends confirmation email

### Admin Dashboard

- **Analytics**: View sales reports and statistics
- **Products**: Full CRUD operations for products
- **Orders**: Manage and update order statuses
- **Users**: View and manage user accounts, toggle admin status

### Email System

- Order confirmation emails with order details
- Order status update emails (pending, processing, shipped, delivered, cancelled)
- Beautiful HTML email templates with product images

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/users` - User registration
- `GET /api/users/me` - Get current user details
- `PATCH /api/users/me` - Update user details

### Products

- `GET /api/products` - Get all products (with filters)
- `GET /api/products?category=<category>` - Get products by category
- `GET /api/products?bestSellers=true` - Get top 35 best sellers
- `POST /api/products` - Create product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart` - Update cart item
- `DELETE /api/cart` - Remove item from cart

### Orders

- `GET /api/orders` - Get user orders
- `GET /api/orders/latest` - Get latest order
- `POST /api/checkout` - Initiate checkout with Stripe
- `POST /api/webhook/stripe` - Stripe webhook handler

### Admin

- `GET /api/admin/products` - Get all products (admin)
- `GET /api/admin/orders` - Get all orders (admin)
- `GET /api/admin/users` - Get all users (admin)
- `PATCH /api/admin/orders/[id]` - Update order status
- `PATCH /api/admin/users/[id]` - Update user role

### Other

- `GET /api/categories` - Get all categories
- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Create address
- `POST /api/upload` - Upload image to Cloudinary
- `POST /api/upload-profile-pic` - Update profile picture
- `POST /api/reverse-geocode` - Get address from coordinates

## 🎨 Design System

### Color Palette

- **Primary**: Purple/Pink gradient (`#B6349A` to `#FEF5FD`)
- **Orange Accents**: (`#F5551B` to `#FFEEE9`)
- **Neutral Grays**: Black scale (`#000000` to `#F9F9F9`)

### Typography

- **Font Family**: Outfit (Google Fonts)
- **Sizes**: Body text, headings with responsive scaling

### Components

- Reusable Button component with icon support
- ProductCard for consistent product display
- Loading states throughout
- Modal components for user interactions

## 🚀 Deployment

The application is ready to be deployed on Vercel or any Node.js hosting platform.

### Environment Variables for Production

Ensure all environment variables are set in your hosting platform's environment settings.

### Database

Set up a PostgreSQL database (recommended: Supabase, Neon, or Railway) and update the `DATABASE_URL`.

## 📝 License

This project is private and proprietary.

## 👤 Author

For suggestions or inquiries, contact: anasibrahimi4664@gmail.com

## 🖋️ Acknowledgements

Design Inspired by - (https://www.figma.com/@dizora_creative) [https://www.figma.com/community/file/1458122252010911211/easymart-e-commerce-100-free-online-store-ui-ux-design-complete-responsive-website]

---

**Note**: This is a full-stack e-commerce application with comprehensive features for both customers and administrators. Make sure to configure all required environment variables and services before running in production.
