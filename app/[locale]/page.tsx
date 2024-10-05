import Header from "../UI/organisms/Header";
import Hero from "../UI/sections/Hero";

export default function Home() {

  return (
    <>
    <Header />
    <main className="dark:bg-gray-900 bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]">
    <Hero />  
    </main>
    </>
  );
}