
import Header from "../UI/organisms/Header";import OfferProducts from "../UI/organisms/OfferProducts";
import Hero from "../UI/sections/Hero";
import NewArrival from "../UI/templat/NewArrival";
import SpecialOfferTemplate from "../UI/templat/SpecialOfferTemplate";
import TrendProductsTemplate from "../UI/templat/TrendProductsTemplate";
import CampanyTemplate from "../UI/templat/CampanyTemplate";
export default function Home() {

  return (
    <>
    <Header />
    <main className="dark:bg-gray-900 bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]">
    <Hero />  
    <NewArrival />
    <TrendProductsTemplate />
    <SpecialOfferTemplate />
    <CampanyTemplate />
    </main>
    </>
  );
}