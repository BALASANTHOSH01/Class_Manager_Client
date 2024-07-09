import CM_logo from "../../../public/CM_logo.png";

const Home = () => {
  return (
    <div>
        <div className=" flex flex-row gap-2 items-center">
            <img src={CM_logo} alt="Logo" className=""/>
            <div className=" felx flex-row items-center gap-1">Class
                <p className="">
                Manager
                </p>
            </div>
        </div>
    </div>
  )
}

export default Home;