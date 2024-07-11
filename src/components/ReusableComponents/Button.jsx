import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({icon,text,className,pageLink,onClickFunction}) => {
  return (
    <Link to={pageLink} className={`flex flex-row items-center gap-2 px-[10px] py-[7px] ${className} text-[18px] justify-center cursor-pointer hover:shadow-lg`} onClick={onClickFunction}>
        <div>
        {icon}
        </div>
        <p>{text}</p>
    </Link>
  )
}

export default Button;