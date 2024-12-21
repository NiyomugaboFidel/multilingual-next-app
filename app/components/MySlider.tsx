'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/splide/css'; // Import Splide core CSS
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { ReactNode } from 'react';

const MySlider = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full'>
      <Splide
        options={{
          type: 'loop',
          drag: 'free',
          focus: 'center',
          perPage: 3,
          perMove: 1,
          gap: '32px',
          pagination: true,
          arrows:true,
          autoScroll: {
            speed: 0.3,
            pauseOnHover: true,
            pauseOnFocus: true,
            rewind: false,
          },// Optional: Auto-play slides
          breakpoints: {
            640: {
              perPage: 1,
              gap: '20px',
            },
            768: {
              perPage: 2,
              gap: '20px',
            },
            1024: {
              perPage: 3,
              gap: '25px',
            },
            1280: {
              perPage: 3,
              gap: '30px',
            },
            1440: {
              perPage: 4,
              gap: '32px',
            },
            1560: {
              perPage: 4,
              gap: '32px',
            },
            1920: {
              perPage: 5,
              gap: '40px',
            },
            2560: {
              perPage: 6,
              gap: '40px',
            },
            3560: {
              perPage: 7,
              gap: '40px',
            },
          },
        }}
        extensions={{ AutoScroll }} 
        aria-label="My Projects"
      >
     
           {children}
      
      </Splide>
    </div>
  );
};

export default MySlider;
