import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import DarkModeProvider from "../context/DarkModeContext";
import ReactQueryContext from "../context/ReactQueryContext";
import { getMessages } from "next-intl/server";
import Footer from "../UI/organisms/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virunga",
  description: "Virunga online shop | E-commerce",
  icons: {
    icon: "/icons/virunga-logo.svg",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}


export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/icons/virunga-logo.svg" />
      </head>
      <body className={`${inter.className} dark:bg-[#181D25] bg-black flex flex-col items-center justify-center   `}>
        <div
          className={`${inter.className} max-w-[1920px]   w-[100%] h-full dark:bg-[#181D25] bg-[#ffffff]  dark:text-textColor-light text-textColor-dark`}
        >
          <ReactQueryContext>
            <DarkModeProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                <Toaster />
                {children}
                {/* <Footer /> */}
              </NextIntlClientProvider>
            </DarkModeProvider>
          </ReactQueryContext>
        </div>
      </body>
    </html>
  );
}
