import { useTranslations } from "next-intl";

interface benefits {
    icon: string;
    title: string;
    desc: string;
  }
const heroData = () => {
    const t = useTranslations('HomePage.Hero')
 
    const benefits: benefits[] = [
        {
          icon: "car.svg",
          title: t('benefittitle1'),
          desc: t('benefitdesc1'),
        },
        {
          icon: "credit-card.svg",
          title: t('benefittitle2'),
          desc: t('benefitdesc2'),
        },
        {
          icon: "refresh-cw.svg",
          title: t('benefittitle3'),
          desc: t('benefitdesc3'),
        },
        {
          icon: "Vector.svg",
          title: t('benefittitle4'),
          desc: t('benefitdesc4'),
        },
      ];
  return {
    benefits:benefits
  }
}

export default heroData