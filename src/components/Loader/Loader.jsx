import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className=" absolute top-[20%] left-[40%] text-center">
        <DNA
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
    <p className="text-[35px] text-[--primary-purpel] text-center font-medium">Loading...</p>
    </div>
  );
};

export default Loader;
