import React from "react";

export default function FiturCard({el}) {
  return (
    <div  className="grid place-content-center cursor-pointer">
      <div
        className={`w-[5rem] h-[5rem] rounded-xl grid place-content-center text-white ${el.color}`}
      >
        <el.icon size="40px" />
      </div>
      <p className="text-center mt-2">{el.name}</p>
    </div>
  );
}
