import React, { useState, useEffect } from "react";
import Cards from "../../component/Card/Card";
// import { Link } from "react-router-dom";
import Spiner from "../Spiner/Spiner";

const Home = () => {
  const [country, setcountries] = useState([]);
  const [mode, setMode] = useState();
  const [loading, setloading] = useState(false);
  const [toggle, setToggle] = useState(`LightMode <i class="fa fa-sun"></i> `);

  const getCountry = async () => {
    setloading(true);
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    setloading(false);
    setcountries(data);
  };
  useEffect(() => {
    getCountry();
  }, []);

  const toggleDarkMode = () => {
    if (mode) {
      document.documentElement.classList.add("dark");
      setToggle(`DarkMode <i class="fa fa-moon"></i>`);
      setMode((current) => (current = !current));
    }
    if (!mode) {
      document.documentElement.classList.remove("dark");
      setToggle(`LightMode <i class="fa fa-sun"></i> `);
      setMode((current) => (current = !current));
    }
  };

  const searchCountry = async (term) => {
    if (term.length < 0 || term === "") return;
    setloading(true);
    const res = await fetch(`https://restcountries.com/v3.1/name/${term}`);
    const data = await res.json();
    setloading(false);
    setcountries(data);
  };
  const filterByRegion = async (region) => {
    setloading(true);
    if (region === "") return;
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();
    setloading(false);
    setcountries(data);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className="w-screen shadow-md py-6 md:px-10 px-3 bg-white dark:bg-gray-700 dark:text-white mb-16">
        <div className=" max-w-full w-full flex mx-auto ">
          <h1 className="font-bold text-xl text-gray-700 dark:text-white">
            Where in the world
          </h1>
          <div className="ml-auto font-medium">
            <button
              className="text-gray-400"
              onClick={() => toggleDarkMode()}
              dangerouslySetInnerHTML={{ __html: toggle }}
            ></button>
          </div>
        </div>
      </div>
      <div className="max-w-full w-full md:flex mx-auto md:flex md:flex-cols py-6 md:px-10 px-3">
        <div className="w-full flex items-center">
          <div className="absolute ml-4">
            <i className="fa fa-search rounded-md text-gray-400"></i>
          </div>
          <input
            type="text"
            className="dark:bg-gray-700 dark:text-white outline-none p-4 shadow-md rounded-md w-full md:w-1/3 text-gray-700 -mr-10"
            onChange={(term) => searchCountry(term.target.value)}
            placeholder="search for a country..."
          />
        </div>

        <select
          className="shadow-md rounded-md font-medium dark:bg-gray-700 outline-none dark:text-white text-gray-700 p-4 mt-4 w-full md:w-[15rem]"
          onChange={(val) => filterByRegion(val.target.value)}
        >
          <option value="">Filter by Religion</option>
          <option value="">Africa</option>
          <option value="">Europe</option>
          <option value="">Asia</option>
          <option value="">Oceania</option>
          <option value="">America</option>
        </select>
      </div>

      <div className="max-w-full py-6 md:px-10 px-3 grid sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 xl:grid xl:grid-cols-4 gap-16 mx-auto items-center justify-center">
        {loading ? (
          <Spiner />
        ) : (
          country?.map((count, index) => (
            <Cards
              title={count.name.common}
              image_url={count.flags}
              population={count.population}
              region={count.region}
              capital={count.capital}
              key={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
