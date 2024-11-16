// CompanyCard.tsx
import React from 'react';

interface CompanyCardProps {
  name: string;
  logo: string; // Image source URL
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, logo }) => {
  return (
    <div className="flex h-[70px] w-[150px] md:w-[196px] items-center justify-center rounded-[8px] bg-[#fff]  dark:border-[#333D4C] border-[#E0E5EB] border  dark:bg-transparent  px-3">
      <img src={logo} alt={name} className="h-8 w-auto mb-2" />
      {/* <span className="text-gray-700 text-sm font-medium dark:text-gray-200">{name}</span> */}
    </div>
  );
};

export default CompanyCard;
