# Gardenia - Frontend

This is the frontend code for the Gardening Tips & Advice Platform, a web application that enables gardening enthusiasts to share and discover gardening knowledge. It features user authentication, content creation with a rich text editor, community interaction, and premium content access via payment integration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)

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

### Frontend:

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **UI Framework**: Tailwind CSS
- **State Management**: Context API or Redux (Optional)
- **Text Editor**: Quill / Draft.js / Slate (to be determined based on project needs)
- **Payment Gateway**: Stripe integration
- **Icons**: React Icons, Lucide-react

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14.x or higher) & npm (v6.x or higher)
- **Yarn** (optional, if preferred over npm)
- A running **backend server** (refer to the backend repository)

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

   Create a `.env` file in the root directory and add the necessary environment variables:

   ```plaintext
   BASE_API=http://localhost:5000/api/v1
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= you cloudinary cloud name
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=you cloudinary upload perset
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY=Your Stripe public key

   ```

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
