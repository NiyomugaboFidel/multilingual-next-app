'use client'
import SignUp from "../organisms/SignUp"
import { useDarkMode } from "@/app/context/DarkModeContext";
import Icon from "../atoms/Icon";
import svg from "@/app/data/svgIcon";

const SignUpFormTemplate = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className=" flex lg:flex-row flex-col-reverse justify-center items-center gap-3 p-[20px] lg:p-[10px]">
        <div className=" h-full min-h-[130vh] lg:w-1/2">
            <SignUp />
        </div>
        <div className="dark:bg-gradient-to-l dark:from-custom-dark-1 dark:to-custom-dark-2 bg-gradient-to-l from-gradientStart to-gradientEnd hidden  lg:w-1/2 h-full min-h-[150vh] dark:bg-[#1B273A] bg-[#ACCBEE] rounded-[16px] overflow-hidden  lg:flex items-start justify-end">
        <div className="bg-[url('/images/image-login.png')] bg-no-repeat   bg-center bg-contain w-full h-full min-h-[150vh] ">
       <div className="h-full flex items-center justify-end p-2 ">
       <button className="" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Icon className="dark:bg-Gary-700 bg-gray-900 " iconTag={svg.moon} />
            ) : (
              <Icon className="dark:bg-Gary-700 bg-gray-900 " iconTag={svg.sun} />
            )}
          </button>
      
       </div>
       </div>

        </div>
    </div>
  )
}

export default SignUpFormTemplate