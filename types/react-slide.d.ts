declare module '@splidejs/react-splide' {
    import { ComponentType } from 'react';
  
    interface SplideProps {
      // Define the props that you are using, or use `any` to bypass strict typing
      [key: string]: any;
    }
  
    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<any>;
  }
  