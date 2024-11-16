import React from 'react';
import { Send, Instagram, Facebook, Youtube } from 'lucide-react';

const NewsletterSection = () => {
  const articles = [
    {
      id: 1,
      title: "Getting Started with Smart Home Devices",
      duration: "6:16",
      thumbnail: "./images/product1.png"
    },
    {
      id: 2,
      title: "Must-Have Tech Accessories for Productivity",
      duration: "10:20",
      thumbnail: "./images/product1.png"
    },
    {
      id: 3,
      title: "Latest Tech Innovations Review",
      duration: "8:40",
      thumbnail: "./images/product1.png"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50">
      {/* Newsletter Signup Section */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">Sign up to our newsletter</h2>
        <p className="text-gray-600 mb-4">
          Receive our latest updates about our products & promotions
        </p>
        
        <div className="flex gap-2 mb-6">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 p-2 border rounded-md"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">
            Subscribe
          </button>
        </div>

        <div className="flex gap-4">
          <Instagram className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          <Facebook className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          <Youtube className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          <Send className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className="md:w-1/2">
        {articles.map(article => (
          <div key={article.id} className="flex gap-4 mb-4">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-32 h-24 object-cover rounded-md"
            />
            <div className="flex flex-col justify-center">
              <span className="text-gray-500 text-sm">{article.duration}</span>
              <h3 className="font-medium">{article.title}</h3>
            </div>
          </div>
        ))}
        
        <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
          View all
          <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
};

export default NewsletterSection;