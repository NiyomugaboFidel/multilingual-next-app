import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h3 className="text-[32px] font-semibold text-gray-900 ">{t('title')}</h3>
      <p className=" text-sm text-gray-800 leading-[24px]">  {t('description')}</p>
    </div>
  );
}
