import React from 'react';
import { Send, Instagram, Facebook, Youtube } from 'lucide-react';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useTranslations } from 'next-intl';

const NewsletterSection = () => {
  const articles = [
    {
      id: 1,
      title: "Getting Started with Smart Home Devices",
      duration: "6:16",
      thumbnail: "/images/hero.png"
    },
    {
      id: 2,
      title: "Must-Have Tech Accessories for Productivity",
      duration: "10:20",
      thumbnail: "/images/hero.png"
    },
    {
      id: 3,
      title: "Latest Tech Innovations Review",
      duration: "8:40",
      thumbnail: "/images/hero.png"
    }
  ];
  const t  = useTranslations() ;
  return (
    <div className="flex flex-col md:flex-row w-full items-start justify-between gap-8 p-8 dark:bg-Gary-800 bg-gray-50  px-[20px]  md:px-[50px] xl:px-[100px]">
      {/* Newsletter Signup Section */}

      <div className=" w-full  lg:w-1/2 flex flex-col  gap-[28px] items-start justify-center">
    <div>
    <h2 className="text-2xl font-bold mb-2">{t("newsletter.title")}</h2>
    <p className="text-gray-600 mb-4">{t("newsletter.description")}</p>
    </div>
        
        <form className="w-full flex gap-2 mb-6 flex-col lg:flex-row">
           <FormField  placeholder='Your email' />
          <Button  label='Subscribe' />

        </form>

        <div className="flex gap-4 xl:pt-[12px]">
          <Icon  hoverStyle='hover:bg-gray-200' className='dark:bg-Gary-700 bg-gray-100' iconTag={<Instagram className="w-6 h-6 dark:text-Gary-300 text-gray-600 hover:text-gray-800 cursor-pointer" />} />
          <Icon  hoverStyle='hover:bg-gray-200' className='dark:bg-Gary-700 bg-gray-100 ' iconTag={<Facebook className="w-6 h-6 dark:text-Gary-300 text-gray-600 hover:text-gray-800 cursor-pointer" />} />
          <Icon   hoverStyle='hover:bg-gray-200' className=' dark:bg-Gary-700 bg-gray-100 ' iconTag={<Youtube className="w-6 h-6 dark:text-Gary-300 text-gray-600 hover:text-gray-800 cursor-pointer" />} />
          <Icon   hoverStyle='hover:bg-gray-200'  className='dark:bg-Gary-700 bg-gray-100 ' iconTag={<Send className="w-6 h-6 dark:text-Gary-300 text-gray-600 hover:text-gray-800 cursor-pointer" />} />

    
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className=" w-full lg:w-1/2 flex flex-col items-start justify-center">
       <div>
       {articles.map(article => (
          <div key={article.id} className="flex gap-4 mb-4 items-center justify-start">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-[140px] h-[86px] rounded-[8px] object-cover object-center  relative dark:bg-gradient-to-l dark:from-custom-dark-1 dark:to-custom-dark-2 bg-gradient-to-l from-gradientStart to-gradientEnd  dark:bg-[#1B273A] bg-[#ACCBEE] "
            />
            <div className="flex flex-col justify-center gap-5 ">
              <span className="text-gray-500 text-bodySmall line-clamp-2  ">{article.duration}</span>
              <h3 className="font-medium text-bodySmall">{article.title}</h3>
            </div>
          </div>
        ))}
        
        <button className=" w-full text-bodySmall text-textColor-dark dark:text-textColor-light hover:text-gray-800 flex items-center gap-1 text-[14px] leading-[20px] font-[500] px-2 ">
          View all
          <span className="text-lg">›</span>
        </button>
       </div>
      </div>
    </div>
  );
};

export default NewsletterSection;