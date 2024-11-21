
import Header from "../UI/organisms/Header";
import Hero from "../UI/sections/Hero";
import NewArrival from "../UI/templat/NewArrival";
import SpecialOfferTemplate from "../UI/templat/SpecialOfferTemplate";
import TrendProductsTemplate from "../UI/templat/TrendProductsTemplate";
import CampanyTemplate from "../UI/templat/CampanyTemplate";
import NewsletterSectionTempalete from "../UI/templat/NewsletterSectionTempalete";
import Footer from "../UI/organisms/Footer";
export default function Home() {

  return (
    <>
    <Header />
    <main className="flex flex-col  2xl:gap-[20px]  min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]">
    <Hero />  
    <NewArrival />
    <TrendProductsTemplate />
    <SpecialOfferTemplate />
    <CampanyTemplate />
   
    </main>
      <div className="w-full h-full 2xl:pt-[72px] ">
      <NewsletterSectionTempalete />
      </div>
     <Footer /> 
    </>
  );
}