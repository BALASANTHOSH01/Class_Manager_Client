

const StudentForm = ({handleChange,handleSubmit,error,studentData,InputField}) => {
  return (
    <div className="mx-auto">
        <form
            onSubmit={handleSubmit}
            className=" flex flex-row justify-around items-start px-[2%] py-[3%] bg-gray-200 border w-[700px] h-[70vh] mx-auto mt-[6%]"
          >
            <div className=" w-[45%]">
              <InputField
                name={"name"}
                handlechange={handleChange}
                value={studentData.name}
                error={error}
              />
              <InputField
                name={"email"}
                handlechange={handleChange}
                value={studentData.email}
                type={"email"}
                error={error}
              />
              <InputField
                name={"password"}
                handlechange={handleChange}
                value={studentData.password}
                type={"password"}
                error={error}
              />
              <InputField
                name={"rollno"}
                handlechange={handleChange}
                value={studentData.rollno}
                error={error}
              />
              <InputField
                name={"year"}
                handlechange={handleChange}
                value={studentData.year}
                error={error}
              />
            </div>

            <div className=" w-[45%]">
              <InputField
                name={"department"}
                handlechange={handleChange}
                value={studentData.department}
                error={error}
              />
              <InputField
                name={"phoneNumber"}
                handlechange={handleChange}
                value={studentData.phoneNumber}
                error={error}
              />
              <InputField
                name={"parentNumber"}
                handlechange={handleChange}
                value={studentData.parentNumber}
                error={error}
              />

              <button
                type="submit"
                className="w-[100%] py-[3%] px-[2%] text-center border bg-[--primary-purpel] mt-[9%] text-white"
              >
                Create Student
              </button>
            </div>
          </form>
    </div>
  )
}

export default StudentForm