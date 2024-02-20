import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Home = () => {
  const [stats, setStats] = useState();

  async function getStats() {
    const { data } = await api.get("/stats/");
    setStats(data);
  }
  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="px-2 md:!px-8 flex flex-col md:flex-row gap-5 mt-5">
      <div className="flex-1 mb-[10px]">
        <h2 className="text-[22px] font-semibold mb-4">Statistics</h2>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 py-6 gap-5 ">
            {stats &&
              stats.map((stat, key) => {
                return <StatCard key={key} stat={stat} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ stat }) => (
  <div className="flex flex-col bg-white hover:-translate-y-1 transition duration-100 shadow-sm ease-in cursor-pointer  relative rounded-[16px] pb-2 pt-2 overflow-hidden">
    <div className="flex flex-col flex-1 justify-between">
      <div className="flex flex-col items-center text-center my-4 space-y-1">
        <p className="font-bold text-4xl text-[#0560FD]">{stat.count}</p>
        <p className="font-semibold text-lg text-gray-600">{stat.name}</p>
      </div>
    </div>
  </div>
);

export default Home;
