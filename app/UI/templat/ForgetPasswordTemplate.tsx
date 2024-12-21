'use client'
import svg from "@/app/data/svgIcon";
import Icon from "../atoms/Icon";
import Forgetpassword from "../organisms/ForgetPassword";

import { useDarkMode } from "@/app/context/DarkModeContext";

const ForgetPasswordTemplate = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className=" flex lg:flex-row flex-col-reverse justify-center items-center gap-3 p-[20px] lg:p-[10px]">
        <div className=" h-full min-h-[95vh] lg:w-1/2">
          <Forgetpassword />
        </div>
        <div className=" hidden  lg:w-1/2 h-full min-h-[95vh] dark:bg-gradient-to-l dark:from-custom-dark-1 dark:to-custom-dark-2 bg-gradient-to-l from-gradientStart to-gradientEnd rounded-[16px]  lg:flex items-start justify-end">
       <div className="bg-[url('/images/image-login.png')] bg-no-repeat   bg-center bg-contain w-full h-full min-h-[95vh]">
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

export default ForgetPasswordTemplate