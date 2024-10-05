import { useTranslations } from "next-intl";

interface Router {
  name: string;
  href: string;
}

export const navRouter = (): Router[] => {
  const t = useTranslations("Navigation");
  
  return [
    {
      name: t("bestSellers"),
      href: "/bestsellers",
    },
    {
      name: t("deals"),
      href: "/deals",
    },
    {
      name: t("newArrivals"),
      href: "/new",
    },
    {
      name: t("giftCards"),
      href: "/gift",
    },
    {
      name: t("helpCenter"),
      href: "/help",
    },
  ];
};
