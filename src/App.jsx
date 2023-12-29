import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

async function fetchApi(id) {
  try {
    return await axios.get(`https://dummyjson.com/users/${id}`);
  } catch (err) {
    return err;
  }
}

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    handleChange();
  }, []);
  const handleChange = async () => {
    const randomNumber = Math.floor(Math.random() * 30);
    try {
      const userData = await fetchApi(randomNumber);
      setData(userData.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto h-screen w-100 flex flex-col gap-5 justify-center items-center ">
      {data.id ? (
        <div
          className={`card w-6/12 relative  py-[2rem] px-[3rem] shadow-lg rounded-lg bg-green-100  text-slate-700`}
        >
          <img
            className="shadow-xl rounded-full w-[200px] h-[200px] mx-auto"
            src={data?.image}
          />
          <div className="flex justify-between text-center py-5 mb-5">
            <div>
              <p className="text-xl font-bold">{data?.address.address}</p>
              <p className="text-lg font-light text-slate-400">
                Street address
              </p>
            </div>
            <div>
              <p className="text-xl font-bold">{data?.address.postalCode}</p>
              <p className="text-lg font-light text-slate-400">Post Code</p>
            </div>
            <div>
              <p className="text-xl font-bold">{data?.address.city}</p>
              <p className="text-lg font-light text-slate-400">City</p>
            </div>
          </div>
          <div className="text-center py-5">
            <p className="text-xl font-bold">
              {data?.firstName} {data?.lastName}
              <span className="text-slate-400">, {data?.age}</span>
            </p>
            <p className="text-lg font-light text-slate-400">
              {data?.address?.address}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <p className="text-lg font-bold">{data?.phone}</p>
            </div>
            <div>
              <p className="text-lg font-bold">{data?.email}</p>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={handleChange}
        className="text-lg font-bold px-4 py-2 rounded shadow-lg bg-gradient-to-r from-slate-100 to-slate-400"
      >
        change user
      </button>
    </div>
  );
}

export default App;
