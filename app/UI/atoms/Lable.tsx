
const Lable = ({label,id, ...props}:{label:string, id:string}) => {
  return (
    <label {...props} className="text-[14px] leading-[24px] text-textColor-light dark:text-textColor-dark" htmlFor={id} >{label}</label>
  )
}

export default Lable