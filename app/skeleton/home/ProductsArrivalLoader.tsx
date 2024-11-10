import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ProductsArrivalLoaderProps {
  isLoading: boolean;
}

const ProductsArrivalLoader: React.FC<ProductsArrivalLoaderProps> = ({
  isLoading,
}) => {
  // if (isLoading) return null;

  return (
    <div className="w-full flex items-center justify-center gap-[16px]">
      <div className="w-1/3 h-[110px]">
        <Skeleton height={100} width={100} />
      </div>
      <div className="w-2/3 flex flex-col justify-center items-start">
        <span className="flex gap-1">
          {Array(5)
            .fill(null)
            .map((_,i) => (
              <Skeleton key={i} circle={true} height={10} width={10} />
            ))}
        </span>
        <Skeleton height={15} width={100} />
        <Skeleton height={15} width={100} />

        <Skeleton height={20} width={40} />
      </div>
    </div>
  );
};

export default ProductsArrivalLoader;
