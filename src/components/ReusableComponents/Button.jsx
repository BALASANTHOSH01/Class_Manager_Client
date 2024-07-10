import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({icon,text,className,pageLink}) => {
  return (
    <Link to={pageLink} className={`flex flex-row items-center gap-2 px-[10px] py-[7px] ${className} text-[18px] justify-center cursor-pointer hover:shadow-lg`}>
        <div>
        {icon}
        </div>
        <p>{text}</p>
    </Link>
  )
}

export default Button;