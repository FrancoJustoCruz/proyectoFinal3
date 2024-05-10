import React, { useState } from 'react';
import SearchForm from './SearchForm';

const DrawerMenu = ({ isOpen, toggleMenu, onSearchLocation }) => {
  const [city, setCity] = useState('');
  const [lastSearches, setLastSearches] = useState([]);

  const handleHideMenu = () => {
    toggleMenu(); // Llama a la función de toggle para cerrar el menú
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    onSearchLocation(trimmedCity);
    handleHideMenu();

    // Añadir la búsqueda actual a la lista de últimas búsquedas
    if (trimmedCity && !lastSearches.includes(trimmedCity)) {
      setLastSearches([trimmedCity, ...lastSearches.slice(0, 2)]);
    }
  };

  const handleRecentSearch = (recentCity) => {
    // Llamar a la función de búsqueda con la ciudad seleccionada
    onSearchLocation(recentCity);
    handleHideMenu();
  };

  return (
    <div id="drawer-navigation" className={`fixed top-0 left-0 z-50 w-[375px] h-screen p-4 overflow-y-auto transition-transform ${isOpen ? '' : '-translate-x-full'} bg-white dark:bg-gray-800 md:w-[459px] h-[1023]`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
      {/* Botón para cerrar el menú */}
      <button type="button" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleHideMenu}>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="m4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <br />
      
      {/* Renderizar el componente SearchForm */}
      <SearchForm
        city={city}
        setCity={setCity}
        handleCitySearch={handleCitySearch}
      />

      {/* Botones de las últimas búsquedas */}
      <div className="mt-4 flex flex-col">
        {lastSearches.map((search, index) => (
          <button
            key={index}
            className="my-2 ml-6 border border-gray-300 text-start text-sm focus:ring-blue-500 focus:border-blue-500 block w-3/4 pl-10 pr-2.5 py-2.5 dark:border-gray-500 dark:bg-transparent dark:text-white"
          
            onClick={() => handleRecentSearch(search)}
          >
            {search}
          </button>
        ))}
      </div>

      {/* Más contenido del menú */}
    </div>
  );
};

export default DrawerMenu;