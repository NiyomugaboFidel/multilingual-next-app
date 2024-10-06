import BenefitCard from "../molecules/BenefitCard";
interface benefits {
  icon: string;
  title: string;
  desc: string;
}
interface BenefitsProps {
  benefits: benefits[];
}
const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
  return (
    <div className=" w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-[24px] ">
      {benefits.map((item, i) => (
        <BenefitCard key={i} items={item} />
      ))}
    </div>
  );
};

export default Benefits;
