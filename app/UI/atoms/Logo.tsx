import Image from "next/image"
import Link from "next/link"

interface LogoProps {
 textLight:string
 textDark:string
}

const Logo:React.FC<LogoProps> = ({textDark, textLight}) => {
  return (
    <Link href={'/'} >
    <div className=" w-[141px] h-[40px] flex items-center justify-center gap-[2px]">
        <span className="w-[36px] h-[36px]">
          <Image width={36} height={36} src={'/icons/virunga-logo.svg'} alt="virunga-logo" />
        </span>
        <span className="w-[94.19px] ">
            <h2 className={`${ textDark ? textDark : textLight } font-bold text-[30px] leading-[45px]`}>Virunga</h2>
        </span> 
    </div>
    </Link>
  )
}

export default Logo