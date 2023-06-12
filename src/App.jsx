import EmpTable from "./components/EmpTable";

function App() {
  return (
    <>
      <div className="flex-col justify-center items-center bg-gray-300 w-screen h-screen">
        <h1 className="text-2xl p-5 text-center font-semibold text-black">
          Employees API with CRUD
        </h1>
        <div className="flex justify-center">
          <EmpTable />
        </div>
      </div>
    </>
  );
}

export default App;
