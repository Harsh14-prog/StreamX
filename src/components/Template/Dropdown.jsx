import React from "react";

const Dropdown = ({ title, options = [], func, className = "" }) => {
  return (
    <div className={`relative w-full  ${className}`}> 
      <select
        onChange={func}
        defaultValue="0"
        name="format"
        id="format"
        className="bg-[#2A2A2A] text-white text-lg px-5 py-3 rounded-lg shadow-lg 
                   focus:outline-none cursor-pointer w-full appearance-none transition-all 
                   duration-300 ease-in-out border-2 border-transparent"
      >
        <option value="0" disabled className="text-zinc-400">
          {title}
        </option>
        {options.map((o, i) => (
          <option
            key={i}
            value={o}
            className="text-zinc-400 hover:bg-[#6556CD] hover:text-white transition duration-300 ease-in-out"
          >
            {o.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Custom dropdown icon */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
        <i className="ri-arrow-down-s-fill text-zinc-300 text-2xl"></i>
      </div>
    </div>
  );
};

export default Dropdown;
