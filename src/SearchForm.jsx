import React from 'react';

const SearchForm = ({ city, setCity, handleCitySearch }) => {
  return (
    <form autoComplete="off" onSubmit={handleCitySearch} className="flex items-center max-w-sm mx-auto pt-4">
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full flex">
  <input
    type="text"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2.5 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Search location"
    required
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
  <div className="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  </div>
  <button
    type="submit"
    className="w-14 h-12 p-2.5 ml-2 text-sm font-medium text-white bg-botonBusqueda border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    GO
  </button>
</div>
    </form>
  );
};

export default SearchForm;