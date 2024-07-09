import { heroImg } from "../../assets/Home/index.js";



const Hero = () => {
  return (
    <div className=" flex flex-row items-center justify-around px-[4%] py-[2%]">
        <div className=" flex flex-col gap-5 flex-[1.5]">
            <div className=" text-[70px] flex flex-row items-center gap-3">
                Class 
                <p className="text-[--primary-purpel] font-semibold">Manager</p>
            </div>
            <p className=" w-[75%] text-[20px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut earum natus similique error labore officiis eius aliquam praesentium neque? Aperiam totam unde ad praesentium sapiente maiores fuga ducimus illo hic.
            </p>
            <div className=" px-[15px] py-[10px] border border-[--primary-purpel] bg-[--primary-purpel] text-white w-[150px] text-center hover:bg-white hover:text-black cursor-pointer duration-300">
                Get Start
            </div>
        </div>
        <div className=" ">
            <img src={heroImg} alt="hero_img" className="w-[400px] h-[400px]" />
        </div>
    </div>
  )
}

export default Hero;