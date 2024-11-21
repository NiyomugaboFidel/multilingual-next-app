
import { useTranslations } from 'next-intl';
  
type CategoryItem = {
    name: string;
    link: string;
  };
  
  type Category = {
    title: string;
    image: string;
    href:string;
    items: CategoryItem[];
  };
  


  const ECategory = () => {
   const t = useTranslations("ECategories");
    const categories: Category[] = [
      {
        title: t('smartphones.title'),
        href: "Smartphones",
        image: "/images/categories/smartphone.png",
        items: [
          { name: t('smartphones.items.apple'), link: "/smartphones/apple" },
          { name: t('smartphones.items.samsung'), link: "/smartphones/samsung" },
          { name: t('smartphones.items.xiaomi'), link: "/smartphones/xiaomi" },
          { name: t('smartphones.items.nokia'), link: "/smartphones/nokia" },
          { name: t('smartphones.items.meizu'), link: "/smartphones/meizu" },
        ],
      },
      {
        title: t('accessories.title'),
        href: "Accessories",
        image: "/images/categories/accessories.png",
        items: [
          { name: t('accessories.items.kits'), link: "/accessories/kits" },
          { name: t('accessories.items.batteries'), link: "/accessories/batteries" },
          { name: t('accessories.items.cables'), link: "/accessories/cables" },
          { name: t('accessories.items.carAccessories'), link: "/accessories/car" },
          { name: t('accessories.items.chargers'), link: "/accessories/chargers" },
          { name: t('accessories.items.fmTransmitters'), link: "/accessories/fm-transmitters" },
        ],
      },
      {
        title: t('tablets.title'),
        href: "Tablets",
        image: "/images/categories/tablet.png",
        items: [
          { name: t('tablets.items.ipad'), link: "/tablets/ipad" },
          { name: t('tablets.items.android'), link: "/tablets/android" },
          { name: t('tablets.items.samsung'), link: "/tablets/samsung" },
          { name: t('tablets.items.xiaomi'), link: "/tablets/xiaomi" },
          { name: t('tablets.items.lenovo'), link: "/tablets/lenovo" },
        ],
      },
      {
        title: t('wearables.title'),
        href: "Wearable Electronics",
        image: "/images/categories/wearable.png",
        items: [
          { name: t('wearables.items.watches'), link: "/wearables/watches" },
          { name: t('wearables.items.fitness'), link: "/wearables/fitness" },
          { name: t('wearables.items.glasses'), link: "/wearables/glasses" },
          { name: t('wearables.items.ebooks'), link: "/wearables/ebooks" },
          { name: t('wearables.items.accessories'), link: "/wearables/accessories" },
          { name: t('wearables.items.recorders'), link: "/wearables/recorders" },
        ],
      },
      {
        title: t('computersLaptops.title'),
        href: "Computers & Laptops",
        image: "/images/categories/laptop.png",
        items: [
          { name: t('computersLaptops.items.laptops'), link: "/category/computers-laptops/laptops" },
          { name: t('computersLaptops.items.desktops'), link: "/category/computers-laptops/desktops" },
          { name: t('computersLaptops.items.monitors'), link: "/category/computers-laptops/monitors" },
          { name: t('computersLaptops.items.accessories'), link: "/category/computers-laptops/accessories" },
        ],
      },
      {
        title: t('camerasPhotoVideo.title'),
        href: "Cameras, Photo & Video",
        image: "/images/categories/camera.png",
        items: [
          { name: t('camerasPhotoVideo.items.digitalCameras'), link: "/category/cameras-photo-video/digital-cameras" },
          { name: t('camerasPhotoVideo.items.videoCameras'), link: "/category/cameras-photo-video/video-cameras" },
          { name: t('camerasPhotoVideo.items.lenses'), link: "/category/cameras-photo-video/lenses" },
          { name: t('camerasPhotoVideo.items.tripods'), link: "/category/cameras-photo-video/tripods" },
        ],
      },
      {
        title: t('headphones.title'),
        href: "Headphones",
        image: "/images/categories/headphone.png",
        items: [
          { name: t('headphones.items.overEar'), link: "/category/headphones/over-ear" },
          { name: t('headphones.items.inEar'), link: "/category/headphones/in-ear" },
          { name: t('headphones.items.noiseCanceling'), link: "/category/headphones/noise-canceling" },
          { name: t('headphones.items.gaming'), link: "/category/headphones/gaming" },
        ],
      },
      {
        title: t('videoGames.title'),
        href: "Video Games",
        image: "/images/categories/video-game.png",
        items: [
          { name: t('videoGames.items.playstation'), link: "/category/video-games/playstation" },
          { name: t('videoGames.items.xbox'), link: "/category/video-games/xbox" },
          { name: t('videoGames.items.pc'), link: "/category/video-games/pc" },
          { name: t('videoGames.items.accessories'), link: "/category/video-games/accessories" },
        ],
      },
    ];
    return categories
  
  }
  
  export default ECategory