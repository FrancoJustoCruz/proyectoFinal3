import React from "react";
import locacion from './assets/download.svg';

const LocationButton = ({ onClick }) => {
  return (
    <button className="w-10 h-10 bg-slate-500 absolute right-0 mr-6 mt-5 rounded-full flex items-center justify-center" onClick={onClick}>
      <img src={locacion} alt="Location Icon" />
    </button>
  );
};

export default LocationButton;