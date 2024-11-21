import AdCard1 from "./AdCard1"
import AdCard2 from "./AdCard2"

const Advert1 = () => {
  return (
    <div className=" pt-[30px] flex flex-col lg:flex-row items-center justify-center gap-5">
        <div className="lg:w-3/5">
        <AdCard1 />
      
        </div>
        <div className="lg:w-2/5">
        <AdCard2 />
        </div>
    </div>
  )
}

export default Advert1