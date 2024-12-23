import React from 'react';
import { Send, Instagram, Facebook, Youtube } from 'lucide-react';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useTranslations } from 'next-intl';

const SocialIcon = ({ Icon }: { Icon: React.ElementType }) => (
  <span className="bg-gray-100 dark:bg-Gary-700 dark:hover:bg-Gary-900 hover:bg-gray-200 icon">
    <Icon className="w-6 h-6 dark:text-Gary-300 text-gray-600 cursor-pointer" />
  </span>
);


const ArticleCard = ({ thumbnail, duration, title }: { thumbnail: string; duration: string; title: string }) => (
  <div className="flex gap-4 mb-4 ">
    <div className="md:w-[260px] h-[106px] rounded-[8px]  dark:bg-gradient-to-l dark:from-custom-dark-1 dark:to-custom-dark-2 bg-gradient-to-l from-gradientStart to-gradientEnd dark:bg-[#1B273A] bg-[#ACCBEE]">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-contain object-center "
      />
    </div>
    <div className="w-full flex flex-col justify-center gap-1">
      <span className="text-gray-500 text-bodySmall line-clamp-2">{duration}</span>
      <h3 className=" w-full   font-medium text-bodySmall line-clamp-3 md:line-clamp-2">{title}</h3>
    </div>
  </div>
);

const NewsletterSection = () => {
  const t = useTranslations();

  const articles = [
    {
      id: 1,
      title: "Getting Started with Smart Home Devices: \nLearn how to set up your first smart home system, \nincluding lights, thermostats, and more.",
      duration: "6:16",
      thumbnail: "/images/hero.png",
    },
    {
      id: 2,
      title: "Must-Have Tech Accessories for Productivity: \nExplore the best gadgets to improve your work efficiency, \nfrom portable monitors to wireless keyboards.",
      duration: "10:20",
      thumbnail: "/images/product1.png",
    },
    {
      id: 3,
      title: "Latest Tech Innovations Review: \nA detailed analysis of the newest gadgets and \ntechnologies shaping the future of innovation.",
      duration: "8:40",
      thumbnail: "/images/image-login.png",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full items-start justify-between gap-8 p-8 dark:bg-Gary-800 bg-gray-50 px-[20px] md:px-[50px] xl:px-[100px]">
      {/* Newsletter Signup Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-[28px] items-start justify-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">{t('newsletter.title')}</h2>
          <p className="text-gray-600 mb-4">{t('newsletter.description')}</p>
        </div>
        <form className=" w-full lg:w-auto flex gap-2 mb-6 flex-col lg:flex-row">
          <FormField placeholder="Your email" />
          <Button label="Subscribe" />
        </form>
        <div className="flex gap-4 xl:pt-[12px]">
          <SocialIcon Icon={Instagram} />
          <SocialIcon Icon={Facebook} />
          <SocialIcon Icon={Youtube} />
          <SocialIcon Icon={Send} />
        </div>
      </div>


      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            thumbnail={article.thumbnail}
            duration={article.duration}
            title={article.title}
          />
        ))}
        <button className="w-full text-bodySmall text-textColor-dark dark:text-textColor-light hover:text-gray-800 flex items-center gap-1 text-[14px] leading-[20px] font-[500] px-2">
          View all
          <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
};

export default NewsletterSection;
