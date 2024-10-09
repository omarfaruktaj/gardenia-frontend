// export default function ImageGallery() {
//   return <div>page</div>;
// }
'use client';

import { useState } from 'react';

// export default function ImageGallery() {
//   return <div>page</div>;
// }

// Mock data for news feed posts
const posts = [
  {
    id: 1,
    title: '10 Tips for Growing Tomatoes',
    category: 'Vegetables',
    upvotes: 150,
    imageUrl: 'https://source.unsplash.com/Klby0nxseY8/800x600',
    author: 'John Doe',
    date: 'October 5, 2024',
    description:
      'Learn how to grow juicy and healthy tomatoes with these 10 essential tips for gardeners.',
    isPremium: false,
  },
  {
    id: 2,
    title: 'How to Create a Beautiful Flower Garden',
    category: 'Flowers',
    upvotes: 200,
    imageUrl: 'https://source.unsplash.com/jFCViYFYcus/800x600',
    author: 'Jane Smith',
    date: 'October 3, 2024',
    description:
      'Step-by-step guide to creating a vibrant and colorful flower garden in your backyard.',
    isPremium: true, // Premium post
  },
  {
    id: 3,
    title: 'Landscaping Ideas for Small Gardens',
    category: 'Landscaping',
    upvotes: 120,
    imageUrl: 'https://source.unsplash.com/9F4BXiWDToE/800x600',
    author: 'Emily Johnson',
    date: 'October 1, 2024',
    description:
      'Maximize your small garden space with these creative landscaping ideas.',
    isPremium: false,
  },
];

const categories = ['All', 'Vegetables', 'Flowers', 'Landscaping'];

const NewsFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('Most Upvotes');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]); // Track favorited posts
  const [verifiedUser, setVerifiedUser] = useState(true); // Simulate if the user is verified

  // Simulate infinite scroll: Currently loading all posts, but in a real app, you'd fetch more as user scrolls
  const [displayedPosts, setDisplayedPosts] = useState(posts);

  // Filter and sort posts based on selected category, sort order, and search term
  const filteredPosts = displayedPosts
    .filter(
      (post) =>
        (selectedCategory === 'All' || post.category === selectedCategory) &&
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'Most Upvotes'
        ? b.upvotes - a.upvotes
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // Handle post favoriting
  const toggleFavorite = (postId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(postId)
        ? prevFavorites.filter((id) => id !== postId)
        : [...prevFavorites, postId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Gardening Tips & Advice
          </h1>
          <p className="mt-4 text-gray-600">
            Explore the latest gardening tips and advice shared by the
            community.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for posts..."
            className="w-full p-3 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8">
          {/* Category Filter */}
          <div>
            <label className="text-gray-600 mr-4">Filter by Category:</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="text-gray-600 mr-4">Sort by:</label>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Most Upvotes">Most Upvotes</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </div>

        {/* News Feed Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              {/* Premium Badge */}
              {post.isPremium && !verifiedUser && (
                <div className="absolute top-0 right-0 m-2 bg-yellow-500 text-white text-xs font-semibold py-1 px-2 rounded">
                  Premium
                </div>
              )}

              {/* Post Image */}
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              {/* Post Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.description}</p>

                {/* Upvote & Downvote */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex space-x-4">
                    <button className="text-green-500 font-semibold">
                      Upvote
                    </button>
                    <button className="text-red-500 font-semibold">
                      Downvote
                    </button>
                  </div>

                  <div className="text-green-500 font-semibold">
                    Upvotes: {post.upvotes}
                  </div>
                </div>

                {/* Author & Date */}
                <div className="text-gray-500 mb-4">
                  <span>{post.author}</span> | <span>{post.date}</span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(post.id)}
                  className={`text-sm font-semibold ${favorites.includes(post.id) ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {favorites.includes(post.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
