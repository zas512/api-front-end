import { useState, useRef } from "react";
import useOutsideListner from "./OutsideListener";
import Lottie from "lottie-react";
import confirmed from "../anims/confirm.json";
import denied from "../anims/denied.json";

function EmpPopup({ closePopup }) {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("M");
  const [anim, setAnim] = useState(false);
  const [animType, setAnimType] = useState(true);
  const outsideRef = useRef(null);

  useOutsideListner(outsideRef, () => {
    closePopup();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      emp_id: id,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
    };

    try {
      const res = await fetch("https://api-with-crud.vercel.app/api/emp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (res.ok) {
        resetForm();
      } else {
        setAnimType((prevPopup) => !prevPopup);
        console.error("Failed to add employee");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setGender("M");
    setAnim(true);
    setTimeout(() => {
      closePopup();
    }, 1500);
  };

  return (
    <div className="absolute top-0">
      <form
        className="flex flex-col items-center w-screen h-screen bg-gray-900 shadow-lg bg-opacity-70"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={outsideRef}
          className="flex flex-col items-center w-auto h-auto p-10 mt-20 rounded-lg newclass new bg-gray-50"
        >
          <h1 className="mb-4 text-xl text-gray-900">Add new employee data</h1>
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              value={id}
              autoComplete="off"
              onChange={(e) => setId(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fname"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              value={firstName}
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lname"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              value={lastName}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          {anim ? (
            <Lottie
              className="w-14"
              animationData={animType ? confirmed : denied}
              loop={false}
            />
          ) : (
            <button
              type="submit"
              className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmpPopup;
