'use client'
import React, { useState } from 'react';
import CompanyCard from '../molecules/CampanyCard';
import ComapanyData from '@/app/data/ComapanyData';

interface Company {
  name: string;
  logo: string;
}

const CompanyList: React.FC = () => {
  const [showAll, setShowAll] = useState(false); // State to toggle visibility of all companies

  // Determine the companies to display based on the `showAll` state
  const visibleCompanies = showAll ? ComapanyData : ComapanyData.slice(0, 4);

  return (
    <div>
      <div className="grid items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[20px] py-4 transition-all ease-in-out duration-300">
        {visibleCompanies.map((company, index) => (
          <CompanyCard key={index} name={company.label} logo={company.logo} />
        ))}
              <button
            onClick={() => setShowAll(prev => !prev)} // Toggle the state to show all companies
            className="h-[70px] w-[150px] md:w-[196px] items-center justify-center rounded-[8px] bg-[#fff] dark:border-[#333D4C] border-[#E0E5EB] border dark:bg-transparent flex font-semibold text-textColor-dark dark:text-textColor-light "
          >
            {showAll ?'Hidden' :  'All brands ➔'}
          </button>
      </div>
     
        {/* <div className="flex justify-center mt-4">
    
        </div> */}
    
    </div>
  );
};

export default CompanyList;
