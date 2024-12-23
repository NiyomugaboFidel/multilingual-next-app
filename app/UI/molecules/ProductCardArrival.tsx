import Image from "next/image";
import StarRating from "@/app/components/StatRating";
import Link from "next/link";

interface ProductCardArrivalProps {
  id:string
  price: number;
  name: string;
  ratings: number[];
  image: string;
  title: string;
  descriptions: string;
}

const ProductCardArrival: React.FC<ProductCardArrivalProps> = ({
  price,
  id,
  name,
  ratings,
  image,
  title,
  descriptions,
}) => {
  return (
    <div className="w-full flex items-center justify-center gap-[16px]">
      <div className="w-1/3 h-[110px]">
      <Link href={`/item?id=${id}`}>

        <Image width={100} height={100} src={image} alt={title} priority />
      </Link>
      </div>
      <div className="w-2/3 flex flex-col gap-[8px] justify-center items-start">
        <div className="w-full flex items-center justify-start gap-[8px]">
          <StarRating ratings={ratings} />
        </div>
        <span>
        <Link href={`/item?id=${id}`}>
          <p className="text-bodyDefault line-clamp-2">
            {name} {" "} {descriptions}
          </p>
          </Link>
        </span>
        <span>
          <b>${price.toFixed(2)}</b>
        </span>
      </div>
    </div>
  );
};

export default ProductCardArrival;
