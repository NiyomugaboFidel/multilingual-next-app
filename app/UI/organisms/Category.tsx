"use client";

import Image from "next/image";
import Link from "next/link";

import CompanyData from "@/app/data/ComapanyData";
// types.ts
type CategoryItem = {
  name: string;
  link: string;
};

type Category = {
  title: string;
  image: string;
  items: CategoryItem[];
};

const categories: Category[] = [
  {
    title: "Smartphones",
    image: "/images/categories/smartphone.png",
    items: [
      { name: "Apple iPhone", link: "/smartphones/apple" },
      { name: "Samsung", link: "/smartphones/samsung" },
      { name: "Xiaomi", link: "/smartphones/xiaomi" },
      { name: "Nokia", link: "/smartphones/nokia" },
      { name: "Meizu", link: "/smartphones/meizu" },
    ],
  },
  {
    title: "Accessories",
    image: "/images/categories/accessories.png",
    items: [
      { name: "Accessory Kits", link: "/accessories/kits" },
      { name: "Batteries & Battery Packs", link: "/accessories/batteries" },
      { name: "Cables", link: "/accessories/cables" },
      { name: "Car Accessories", link: "/accessories/car" },
      { name: "Chargers & Power Adapters", link: "/accessories/chargers" },
      { name: "FM Transmitters", link: "/accessories/fm-transmitters" },
    ],
  },
  {
    title: "Tablets",
    image: "/images/categories/tablet.png",
    items: [
      { name: "Apple iPad", link: "/tablets/ipad" },
      { name: "Android Tablets", link: "/tablets/android" },
      { name: "Samsung", link: "/tablets/samsung" },
      { name: "Xiaomi", link: "/tablets/xiaomi" },
      { name: "Lenovo", link: "/tablets/lenovo" },
    ],
  },
  {
    title: "Wearable Electronics",
    image: "/images/categories/wearable.png",
    items: [
      { name: "Smart Watches", link: "/wearables/watches" },
      { name: "Fitness Trackers", link: "/wearables/fitness" },
      { name: "Smart Glasses", link: "/wearables/glasses" },
      { name: "E-books", link: "/wearables/ebooks" },
      { name: "Clips, Arm & Wristbands", link: "/wearables/accessories" },
      { name: "Voice Recorders", link: "/wearables/recorders" },
    ],
  },
  {
    title: "Computers & Laptops",
    image: "/images/categories/laptop.png",
    items: [
      { name: "Laptops", link: "/category/computers-laptops/laptops" },
      { name: "Desktops", link: "/category/computers-laptops/desktops" },
      { name: "Monitors", link: "/category/computers-laptops/monitors" },
      {
        name: "Computer Accessories",
        link: "/category/computers-laptops/accessories",
      },
    ],
  },
  {
    title: "Cameras, Photo & Video",
    image: "/images/categories/camera.png",
    items: [
      {
        name: "Digital Cameras",
        link: "/category/cameras-photo-video/digital-cameras",
      },
      {
        name: "Video Cameras",
        link: "/category/cameras-photo-video/video-cameras",
      },
      { name: "Camera Lenses", link: "/category/cameras-photo-video/lenses" },
      {
        name: "Tripods & Accessories",
        link: "/category/cameras-photo-video/tripods",
      },
    ],
  },
  {
    title: "Headphones",
    image: "/images/categories/headphone.png",
    items: [
      { name: "Over-Ear Headphones", link: "/category/headphones/over-ear" },
      { name: "In-Ear Headphones", link: "/category/headphones/in-ear" },
      {
        name: "Noise-Canceling Headphones",
        link: "/category/headphones/noise-canceling",
      },
      { name: "Gaming Headsets", link: "/category/headphones/gaming" },
    ],
  },
  {
    title: "Video Games",
    image: "/images/categories/video-game.png",
    items: [
      { name: "PlayStation Games", link: "/category/video-games/playstation" },
      { name: "Xbox Games", link: "/category/video-games/xbox" },
      { name: "PC Games", link: "/category/video-games/pc" },
      { name: "Gaming Accessories", link: "/category/video-games/accessories" },
    ],
  },
];

export default function ShopCategories() {
  return (
    <div className="">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-bodySmall text-gray-500">
          <li>
            <Link
              href="/"
              className="hover:text-gray-700 hover:underline text-bodySmall text-textColor-dark dark:text-textColor-light"
            >
              Home
            </Link>
          </li>
          <li>{"/"}</li>
          <li className="text-gray-700 text-bodySmall dark:text-Gary-300">
            Categories
          </li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-headingH3 text-textColor-dark font-[600] dark:text-textColor-light">
        Shop categories
      </h1>

      {/* Brands */}
      <div className=" py-[24px] grid items-center grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[20px] transition-all ease-in-out duration-300">
        {CompanyData.map((company, index) => (
          <Image
            src={company.logo}
            alt={company.label}
            width={200}
            height={100}
            className="w-auto h-auto"
          />
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.title}
            className="bg-white dark:bg-primaryColor-dark  rounded-[8px] overflow-hidden   transition-shadow"
          >
            {/* Category Image */}
            <Link href={`/category/${category.title.toLowerCase()}`}>
              <div className="relative h-48  bg-gray-50 dark:bg-Gary-800 rounded-[6px]">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={300}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-pretty text-bodyDefault font-[600] p-2">
                {category.title}
              </h3>
            </Link>

            {/* Category Items List */}
            <div className="p-1 px-2 ">
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.link}
                      className="text-Gary-700 text-bodySmall dark:text-Gary-300 hover:text-gray-900 transition-colors block  rounded-[6px] hover:underline "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
