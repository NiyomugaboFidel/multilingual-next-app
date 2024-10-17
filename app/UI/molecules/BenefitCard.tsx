import Icon from "../atoms/Icon";
interface benefits {
  icon: string;
  title: string;
  desc: string;
}

interface BenefitCardProps {
  items: benefits;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ items }) => {
  return (
    <div>
      <div className="flex flex-col 2xl:flex-row w-full h-full items-center justify-center gap-[16px]">
        <span className=" ">
          <Icon
            width={30}
            height={30}
            iconName={items.icon}
            className="bg-gray-50 w-[86px] h-[86px] md:w-[86px] md:h-[86px] hover:hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-Gary-800"
          />
        </span>
        <span className="">
          <h5 className="text-bodyDefault font-semibold text-Gary-900 text-center dark:text-white">
            {items.title}
          </h5>
          <p className="text-bodySmall text-center dark:text-Gary-300">{items.desc}</p>
        </span>
      </div>
    </div>
  );
};

export default BenefitCard;
