"use client";
import Header from "@/app/UI/organisms/Header";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "use-intl";
export default function Notfound() {
  const t = useTranslations('notfound');
  return (
    <section className=" min-h-screen dark:bg-Gary-900 bg-[#FFFFFF]">
      <div className="h-full pt-[20px] w-full  flex flex-col justify-center items-center">
        <div className="w-full h-full flex flex-col items-center justify-center gap-[32px] px-[20px]">
          <Image
            width={500}
            height={182}
            src={"/images/404.png"}
            alt="not-found"
            priority
          />
          <div className="w-full">
            <h2 className="text-Gary-900 dark:text-textColor-light text-headingH2 font-[600] text-center">
              {t('title')}
            </h2>
            <p className="text-bodyDefault text-center">
            {t('info')}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block px-6 py-3 text-bodyDefault  bg-[#F55266] text-white  rounded-[8px] shadow hover:bg-[#F55252] transition duration-300"
          >
              {t('label')}
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
}
