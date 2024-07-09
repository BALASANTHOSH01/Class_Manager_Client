import { Footer, NavBar } from "../../components/Layouts/index.js";
import {Hero} from "../../components/Home/index.js";

const Home = () => {
  return (
    <div className=" overflow-hidden">
       <NavBar/>
       <Hero/>
       <Footer/>
    </div>
  )
}

export default Home;