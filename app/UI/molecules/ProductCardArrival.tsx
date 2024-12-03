import Image from "next/image";
import StarRating from "@/app/components/StatRating";

interface ProductCardArrivalProps {
  price: number;
  name: string;
  ratings: number[];
  image: string;
  title: string;
  descriptions: string;
}

const ProductCardArrival: React.FC<ProductCardArrivalProps> = ({
  price,
  name,
  ratings,
  image,
  title,
  descriptions,
}) => {
  return (
    <div className="w-full flex items-center justify-center gap-[16px]">
      <div className="w-1/3 h-[110px]">
        <Image width={100} height={100} src={image} alt={title} priority />
      </div>
      <div className="w-2/3 flex flex-col gap-[8px] justify-center items-start">
        <div className="w-full flex items-center justify-start gap-[8px]">
          <StarRating ratings={ratings} />
        </div>
        <span>
          <p className="text-bodyDefault line-clamp-2">
            {name} {descriptions}
          </p>
        </span>
        <span>
          <b>${price.toFixed(2)}</b>
        </span>
      </div>
    </div>
  );
};

export default ProductCardArrival;
