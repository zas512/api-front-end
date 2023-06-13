import { useEffect, useState } from "react";
import EmpPopup from "./EmpPopup";
import UpdateEmp from "./UpdateEmp";

const API = "http://localhost:8000/api/emp";

function EmpTable() {
  const [emps, setEmps] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  const togglePopup = () => {
    setPopUp((prevPopup) => !prevPopup);
  };
  const toggleUpdatePopup = (empId) => {
    setSelectedEmpId(empId);
    setUpdatePopUp((prevPopup) => !prevPopup);
  };

  //fetch emp data
  const fetchEmployees = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setEmps(data);
    } catch (err) {
      console.error(err);
    }
  };

  //delete emp func
  const deleteEmployee = async (empId) => {
    try {
      await fetch(`http://localhost:8000/api/${empId}`, {
        method: "DELETE",
      });
      setEmps((prevEmps) => prevEmps.filter((emp) => emp.emp_id !== empId));
    } catch (err) {
      console.error(err);
    }
  };

  const closePopup = () => {
    setPopUp(false);
    setUpdatePopUp(false);
  };

  useEffect(() => {
    fetchEmployees(API);
  }, []);

  return (
    <>
      <div className="relative w-2/4 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full h-auto text-sm text-left text-gray-500 shadow-lg dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="flex justify-end px-6 py-3">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-sm text-xs px-2 py-2.5 mr-2"
                  onClick={togglePopup}
                >
                  Add New
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {emps.map((curEmp) => {
              const { emp_id, first_name, last_name, gender } = curEmp;
              return (
                <tr
                  key={emp_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {emp_id}
                  </td>
                  <td className="px-6 py-4">{first_name}</td>
                  <td className="px-6 py-4">{last_name}</td>
                  <td className="px-6 py-4">{gender}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-sm text-xs px-2 py-2.5 mr-2"
                      onClick={() => toggleUpdatePopup(emp_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-sm text-xs px-2 py-2.5 mr-2"
                      onClick={() => deleteEmployee(emp_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {popUp ? <EmpPopup closePopup={closePopup} /> : togglePopup}
      {updatePopUp ? (
        <UpdateEmp closePopup={closePopup} empId={selectedEmpId} />
      ) : (
        toggleUpdatePopup
      )}
    </>
  );
}

export default EmpTable;
