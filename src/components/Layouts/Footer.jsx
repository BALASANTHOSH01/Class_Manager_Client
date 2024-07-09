import { ImLinkedin as LinkedInIcon } from "react-icons/im";
import { FaFacebook as FacebookIcon } from "react-icons/fa";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { FaInstagram  as InstagramIcon} from "react-icons/fa6";


const Footer = () => {
  return (
    <div className=' text-gray-300 w-screen bg-black h-[40vh] bottom-0 text-[22px] px-[2%] py-[2%] text-center'>
      <div>

        <div className=" flex flex-row items-center gap-5 mx-auto justify-center my-[2%]">
          <LinkedInIcon className=" cursor-pointer hover:text-gray-400"/>
          <FacebookIcon className=" cursor-pointer hover:text-gray-400"/>
          <XIcon className=" cursor-pointer hover:text-gray-400"/>
          <InstagramIcon className=" cursor-pointer hover:text-gray-400"/>
        </div>

        <p className=" text-[17px]">@ All rights are reserved</p>
      </div>
    </div>
  )
}

export default Footer