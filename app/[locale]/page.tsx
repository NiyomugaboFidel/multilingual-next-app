import Header from "../UI/organisms/Header";
import Hero from "../UI/sections/Hero";
import NewArrival from "../UI/templat/NewArrival";
import TrendProductsTemplate from "../UI/templat/TrendProductsTemplate";

export default function Home() {

  return (
    <>
    <Header />
    <main className="dark:bg-gray-900 bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]">
    <Hero />  
    <NewArrival />
    <TrendProductsTemplate />
    </main>
    </>
  );
}