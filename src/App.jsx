import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

async function fetchApi() {
  try {
    return await axios.get(`https://dummyjson.com/users`);
  } catch (err) {
    return err;
  }
}

const colors = [
  "#fed7aa",
  "#d9f99d",
  "#a7f3d0",
  "#a5f3fc",
  "#bfdbfe",
  "#e9d5ff",
  "#fbcfe8",
];

function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [color1, setColor1] = useState(colors[0]);
  const [color2, setColor2] = useState(colors[2]);

  const getData = async () => {
    try {
      const userData = await fetchApi();
      setUsers(userData.data.users);
      handleChange();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleChange();
  }, [users]);

  const handleChange = () => {
    console.log("calling handleChange, ", users);
    if (users.length > 0) {
      const randomNumber = Math.floor(Math.random() * users.length);
      const randomColor1 = Math.floor(Math.random() * colors.length);
      const randomColor2 = Math.floor(Math.random() * colors.length);

      setColor1(colors[randomColor1]);
      setColor2(colors[randomColor2]);
      setData(users[randomNumber]);
    }
  };

  return (
    <div className="container mx-auto h-screen w-100 flex flex-col gap-5 justify-center items-center ">
      <h1 className="text-6xl text-slate-400 font-light text-center">
        Random User Data
      </h1>
      {data.id ? (
        <div
          className={`card w-full mx-[8px] md:w-6/12 relative px-[8px] py-[2rem] md:py-[2rem] md:px-[3rem] shadow-lg rounded-lg text-slate-700`}
          style={{
            background: `linear-gradient(${
              Math.PI * Math.random() * 100
            }deg, ${color1}, ${color2})`,
          }}
        >
          <img
            className="shadow-xl rounded-full w-[200px] h-[200px] mx-auto"
            src={data?.image}
          />
          <div className="md:grid  items-center md:grid-rows-1 md:grid-cols-3 text-center py-5 ">
            <div>
              <p className="text-lg font-normal">{data?.address.address}</p>
              <p className="text-base font-light text-slate-400">
                Street address
              </p>
            </div>
            <div>
              <p className="text-lg font-normal">{data?.address.postalCode}</p>
              <p className="text-base font-light text-slate-400">Post Code</p>
            </div>
            <div>
              <p className="text-lg font-normal">{data?.address.city}</p>
              <p className="text-base font-light text-slate-400">City</p>
            </div>
          </div>
          <div className="text-center py-5">
            <p className="text-2xl font-bold">
              {data?.firstName} {data?.lastName}
              <span className="text-slate-400">, {data?.age}</span>
            </p>
            <p className="text-lg font-light text-slate-400">
              {data?.address?.address}
            </p>
          </div>
          <div className="flex items-center md:justify-between flex-col md:flex-row">
            <div>
              <p className="text-base font-normal">{data?.phone}</p>
            </div>
            <div>
              <p className="text-base font-normal">{data?.email}</p>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={handleChange}
        className="text-lg font-bold px-4 py-2 rounded shadow-lg bg-gradient-to-r from-slate-100 to-slate-400"
      >
        Refresh
      </button>
    </div>
  );
}

export default App;
