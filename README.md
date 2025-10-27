# Gardenia - Frontend

Welcome to Gardenia, a modern web application that connects gardening enthusiasts worldwide. This platform enables users to share gardening knowledge, interact with fellow gardeners, and access premium content. Built with Next.js and TypeScript, Gardenia offers a responsive, user-friendly interface for both casual and serious gardeners.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Key Functionality](#key-functionality)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register, login, logout, and JWT-based session management.
- **Responsive Design**: Mobile-first design, ensuring compatibility across devices.
- **Rich Text Editor**: Create and share gardening tips and guides with multimedia support.
- **Upvoting & Commenting**: Engage with posts by upvoting, commenting, and following other users.
- **Premium Content Access**: Payment integration for unlocking exclusive gardening content.
- **Advanced Search & Filtering**: Search and filter content based on categories, popularity, and more.
- **Admin Dashboard**: Manage users, posts, and payments through a dedicated admin panel.
- **Social Interactions**: Follow users, and explore favorite posts.
- **Animations**: Micro-animations for smooth transitions and improved UX.
- **Unique Feature**: Challenges page.

## Tech Stack

### Core Technologies

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
- **Text Editor**: [TipTap](https://tiptap.dev/) for rich text editing
- **Payment Gateway**: [Stripe](https://stripe.com/) integration
- **Image Upload**: [Cloudinary](https://cloudinary.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14.x or higher) & npm (v6.x or higher)
- **Yarn** (optional, if preferred over npm)
- A running **backend server** ( [backend repository](https://github.com/omarfaruktaj/gardenia-backend))

## Instructions

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/omarfaruktaj/gardenia-frontend.git
   cd gardenia-frontend
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   # API Configuration
   BASE_API=http://localhost:5000/api/v1    # Update this if your backend runs on a different port

   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
   ```

   To obtain these values:

   - **Cloudinary Setup**:

     1. Create a free account at [Cloudinary](https://cloudinary.com/users/register/free)
     2. Navigate to Dashboard > Settings > Account Details to find your Cloud Name
     3. Create an upload preset: Settings > Upload > Upload presets > Add upload preset
     4. Set the upload preset to "Unsigned" mode and copy the preset name

   - **Stripe Setup**:

     1. Create a free account at [Stripe](https://dashboard.stripe.com/register)
     2. Get your publishable key from Dashboard > Developers > API keys
     3. Use the test mode key for development

   - **BASE_API**:
     - Default is `http://localhost:5000/api/v1` assuming backend runs on port 5000
     - Adjust the port number if your backend uses a different port
     - For production, update to your deployed backend URL

4. **Start the development server:**

   ```bash
   yarn run dev
   ```

   The application should now be running at `http://localhost:3000`.

## Key Functionality

### User Authentication

- JWT-based authentication for secure login, registration, and session handling.
- Supports registration with email and password, including profile management.

### Rich Text Editor

- Users can create rich multimedia posts (text, images, videos) using the integrated editor.
- Supports formatting options like bold, italics, headings, lists, etc.

### Premium Content & Payment Integration

- Users can access premium gardening content by making payments through Stripe or Aamarpay.
- Payment status is linked to user verification, which unlocks exclusive features and content.

### Upvote & Comment System

- Engage with community posts by upvoting or downvoting content.
- Users can comment on posts and reply to other users (optional).

### Search & Filter

- Search for content by keywords, categories, and popularity.
- Filter posts by categories such as Vegetables, Flowers, Landscaping, and more.

### Garden Journal

- Personal digital garden tracking system for users to document their gardening journey
- Create and manage multiple garden plots with detailed information
- Track planting dates, watering schedules, and plant growth progress
- Add notes, photos, and maintenance records for each garden plot
- Set reminders for important gardening tasks and seasonal activities

## Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication related pages
│   ├── (dashboard)/       # User dashboard features
│   ├── (main)/           # Main application pages
│   └── admin/            # Admin dashboard
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Other components
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── schemas/              # Zod validation schemas
├── services/            # API service functions
└── types/               # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [@omarfaruktaj](https://github.com/omarfaruktaj)
- Project Link: [https://github.com/omarfaruktaj/gardenia-frontend](https://github.com/omarfaruktaj/gardenia-frontend)
