import React from 'react'

const StaffForm = ({handleChange,handleSubmit,staffData,error,InputField}) => {
  return (
    <div className=' mx-auto'>
         <form
            onSubmit={handleSubmit}
            className=" flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[50vh] mx-auto mt-[6%]"
          >
            <div className=" w-[45%]">
              <InputField
                name={"name"}
                handlechange={handleChange}
                value={staffData.name}
                error={error}
              />
              <InputField
                name={"email"}
                handlechange={handleChange}
                value={staffData.email}
                type={"email"}
                error={error}
              />
              <InputField
                name={"password"}
                handlechange={handleChange}
                value={staffData.password}
                type={"password"}
                error={error}
              />
            </div>

            <div className=" w-[45%]">
              <InputField
                name={"department"}
                handlechange={handleChange}
                value={staffData.department}
                error={error}
              />
              <InputField
                name={"phoneNumber"}
                handlechange={handleChange}
                value={staffData.phoneNumber}
                error={error}
              />

              <button
                type="submit"
                className="w-[100%] py-[3%] px-[2%] text-center border bg-[--primary-purpel] mt-[9%] text-white"
              >
                Create staff
              </button>
            </div>
          </form>
    </div>
  )
}

export default StaffForm;