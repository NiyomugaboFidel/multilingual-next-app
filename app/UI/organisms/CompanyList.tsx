'use client'
import React, { useState } from 'react';
import CompanyCard from '../molecules/CampanyCard';
import ComapanyData from '@/app/data/ComapanyData';
import Link from 'next/link';



const CompanyList: React.FC = () => {


  const visibleCompanies = ComapanyData ;

  return (
    <div>
      <div className="grid items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[20px] py-4 transition-all ease-in-out duration-300">
        {visibleCompanies.map((company, index) => (
          <CompanyCard key={index} name={company.label} logo={company.logo} />
        ))}
              <button
      
            className="h-[70px] w-[150px] md:w-[196px] items-center justify-center rounded-[8px] bg-[#fff] dark:border-[#333D4C] border-[#E0E5EB] border dark:bg-transparent flex font-semibold text-textColor-dark dark:text-textColor-light "
          >
            <Link href={'/categories'}>
            {'All brands ➔'}
            </Link>
          
          </button>
      </div>
 
   
    </div>
  );
};

export default CompanyList;
