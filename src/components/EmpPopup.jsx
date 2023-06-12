import { useState, useRef } from "react";
import useOutsideListner from "./OutsideListener";

function EmpPopup({ closePopup }) {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("M");
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
      const res = await fetch("http://localhost:8000/api/emp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (res.ok) {
        resetForm();
      } else {
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
    setTimeout(() => {
      closePopup();
    }, 1000);
  };

  return (
    <div className="absolute top-0">
      <form
        className="flex flex-col items-center w-screen h-screen overflow-x-auto bg-gray-900 shadow-lg sm:rounded-lg bg-opacity-70"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={outsideRef}
          className="w-auto h-auto p-10 mt-20 newclass new bg-gray-50"
        >
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
          <button
            type="submit"
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmpPopup;
