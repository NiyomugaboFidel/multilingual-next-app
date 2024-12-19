'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ElectronicSearch from '../categories/el/Electronic';

const Page = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  switch (category) {
    case 'el':
      return <ElectronicSearch />;
    default:
      return <ElectronicSearch /> ;
  }
};

export default Page;
