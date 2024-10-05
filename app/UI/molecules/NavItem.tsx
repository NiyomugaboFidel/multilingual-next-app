import { FaAngleRight } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";
interface CategoryPorps {
  categoryisOpen: boolean;
}
const NavItem: React.FC<CategoryPorps> = ({ categoryisOpen }) => {
  return (
<div>
<div
      className={`${
        categoryisOpen ? "flex" : "hidden"
      } lg:h-[424px] 2xl:h-[546px] min-h-full items-start justify-center bg-[#ffffff]  absolute top-[50px] left-0  min-w-[304px] ring-1 dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px] p-[12px]`}
    >
      <ul className=" h-full w-full max-w-[522px] gap-[6px] flex flex-col">
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>

      </ul>
    </div>
        <div
      className={`${
       'hidden'
      }  lg:h-[424px] 2xl:h-[546px] min-h-full items-start justify-center bg-[#ffffff]  mx-[5px] shadow absolute top-[50px] left-[100%]  min-w-[602px] ring-1 dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px] p-[12px]`}
    >
      <ul className=" h-full w-full max-w-[522px] gap-[6px] flex flex-col">
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>
        <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]">
          <span>
            <MdComputer className="text-Gary-700 dark:text-Gary-300" />
          </span>
          <span className="  flex items-center justify-center dark:text-gray-200">
            Computers & Accessories
          </span>
          <span>
            <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
          </span>
        </li>

      </ul>
    </div>
</div>
  );
};

export default NavItem;
