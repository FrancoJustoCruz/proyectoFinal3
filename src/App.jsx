import { useState, useEffect } from "react";
import Icon from "react-icons-kit";
import { activity } from "react-icons-kit/feather/activity";
import { useDispatch, useSelector } from "react-redux";
import { get5DaysForecast, getCityData } from "./Store/Slices/WeatherSlice.js";
import { SphereSpinner } from "react-spinners-kit";
import DrawerMenu from "./DrawerMenu.jsx";
import nube from './assets/weather-app-master/Cloud-background.png';
import gps from '../public/gps.svg';
import locacion from './assets/download.svg'

import clearIcon from './assets/weather-app-master/Clear.png';
import lightCloudIcon from './assets/weather-app-master/LightCloud.png';
import heavyCloudIcon from './assets/weather-app-master/HeavyCloud.png';
import lightRain from './assets/weather-app-master/LightRain.png'
import shower from './assets/weather-app-master/Shower.png';
import cloud from './assets/weather-app-master/Cloud-background.png'
import thunder from './assets/weather-app-master/Thunderstorm.png'
import snow from './assets/weather-app-master/Snow.png'
import hail from './assets/weather-app-master/Hail.png'

function App() {
 
  const {
    citySearchLoading,
    citySearchData,
    forecastLoading,
    forecastData,
    forecastError,
  } = useSelector((state) => state.weather);

  const weatherIcons = {
    '01d': clearIcon,
    '01n': clearIcon,

    '02d': lightCloudIcon,
    '02n': lightCloudIcon,

    '03d': heavyCloudIcon,
    '03n': heavyCloudIcon,

    '04d': cloud,
    '04n': cloud,

    '09d': lightRain,
    '09n': lightRain,

    '10d': shower,
    '10n': shower,

    '11d': thunder,
    '11n': thunder,

    '13d': snow,
    '13n': snow,

    '50d': hail,
    '50n': hail,
  };

  

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const [loadings, setLoadings] = useState(true);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  const allLoadings = [citySearchLoading, forecastLoading];
  useEffect(() => {
    const isAnyChildLoading = allLoadings.some((state) => state);
    setLoadings(isAnyChildLoading);
  }, [allLoadings]);

 
  const [city, setCity] = useState('Karachi');

  
  const [unit, setUnit] = useState('metric'); // metric = C and imperial = F

  
  const toggleUnit = () => {
    setLoadings(true);
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

 
  const dispatch = useDispatch();

  
  const fetchData = () => {
    dispatch(
      getCityData({
        city,
        unit,
      })
    ).then((res) => {
      if (!res.payload.error) {
        dispatch(
          get5DaysForecast({
            lat: res.payload.data.coord.lat,
            lon: res.payload.data.coord.lon,
            unit,
          })
        );
      }
    });
  };

 
  useEffect(() => {
    fetchData();
  }, [unit, city]);


  const handleCitySearch = (city) => {
    setCity(city);
  };

  
  const filterForecastByFirstObjTime = (forecastData) => {
    if (!forecastData) {
      return [];
    }

    const firstObjTime = forecastData[0].dt_txt.split(' ')[1];
    return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
  };

  const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);
  const weatherIcon = citySearchData && citySearchData.data ? weatherIcons[citySearchData.data.weather[0].icon] : null;

  
  const handleGetUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("User's location:", position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  return (
    <div className="font-Raleway relative h-screen">
      <DrawerMenu isOpen={isMenuOpen} toggleMenu={handleToggleMenu} onSearchLocation={handleCitySearch} />
      <div className="flex flex-col md:flex-row h-full">
        
        <section className="bg-Fondo bg-t w-full md:w-[459px] md:max-w-[459px] md:flex-grow relative flex z-10"
          style={{ minHeight: '810px', height: '100%' }}>
           <button className="w-10 h-10 bg-slate-500 absolute right-0 mr-6 mt-5 rounded-full flex items-center justify-center" onClick={handleGetUserLocation}>
  <img src={locacion} alt="" style={{ fill: 'white' }} />
</button>
          <img className="object-cover mt-20 opacity-[5%] w-[800px] h-[326px]" src={nube} alt="Cloud background" />
          <button
            className="absolute z-50 top-5 left-4 text-white bg-searchPlaces text-sm px-5 py-2.5 w-40 h-10"
            type="button"
            onClick={handleToggleMenu}
          >
            Search for places
          </button>
         
          <div className="absolute  top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           
            {loadings ? (
              <div className="flex justify-center">
                <SphereSpinner loadings={loadings} color="#2fa5ed" size={20} />
              </div>
            ) : (
              <>
                {citySearchData && citySearchData.error ? (
                  <div className="text-red-500">{citySearchData.error}</div>
                ) : (
                  <>
                    {forecastError ? (
                      <div className="text-red-500">{forecastError}</div>
                    ) : (
                      <>
                        {citySearchData && citySearchData.data ? (
                          <div >
                            
                            
                              
                                
                              {weatherIcon && <img src={weatherIcon} alt="icon" className="w-50 h-44 pr-10  translate-y-1/2 " />}
                              
                                <div className=" translate-y-3/4 bottom-20">  
                              <h1 className="text-white w-48 h-40 text-9xl font-Raleway inline-block">
                              {Math.round(citySearchData.data.main.temp)}
                               <span className="text-gray-400 text-5xl ml-1 font-Raleway">&deg;C</span>
                             </h1>

                                <br />
                                <h2 className="text-white text-3xl text-center font-bold  ">{citySearchData.data.weather[0].main}</h2>
                                <br />
                                <h3 className="text-white text-center font-bold">
    Today · {new Date().toLocaleDateString('en-US', { weekday: 'short' })}, {new Date().getDate()} {new Date().toLocaleDateString('en-US', { month: 'short' })}
  </h3>
                                <br />
                                <h6 className="text-white text-center justify-center text-lg font-semibold flex items-center">
                                  <img className=" w-5 h-6 mr-1" src={gps} alt="" />
                                     
                                  { (citySearchData.data.name)}
                                </h6>
                              </div>
                            </div>
                          
                         
                        ) : (
                          <div className="text-red-500">No Data Found</div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>
        
        <section className="bg-otroFondo w-full md:px-32 md:w-[981px] md:min-w-[375px] md:flex-grow flex flex-col p-6 font-Raleway">
        <div className="flex justify-end mb-4 md:flex hidden">
    <button className="bg-barraHumedad text-celsius font-semibold py-1 px-2 rounded-full" onClick={() => setUnit('metric')}>°C</button>
    <button className="bg-farenheit text-barraHumedad font-semibold py-1 px-2 rounded-full ml-2" onClick={() => setUnit('imperial')}>°F</button>
  </div>
        {filteredForecast.length > 0 ? (
  <div className="grid grid-cols-2 md:grid-cols-5 justify-center place-items-center gap-2 md:gap-2 md:mx-0">
    {filteredForecast.map((data, index) => {
      const date = new Date(data.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const dayOfMonth = date.getDate();
     
      const maxTemp = Math.round(data.main.temp_max);
      const minTemp = Math.round(data.main.temp_min);

      
      const weatherIcons = {
        '01d': clearIcon,
        '01n': clearIcon,
    
        '02d': lightCloudIcon,
        '02n': lightCloudIcon,
    
        '03d': heavyCloudIcon,
        '03n': heavyCloudIcon,
    
        '04d': cloud,
        '04n': cloud,
    
        '09d': lightRain,
        '09n': lightRain,
    
        '10d': shower,
        '10n': shower,
    
        '11d': thunder,
        '11n': thunder,
    
        '13d': snow,
        '13n': snow,
    
        '50d': hail,
        '50n': hail,
      };

      const weatherIcon = weatherIcons[data.weather[0].icon] || null;

      return (
        <div className="text-barraHumedad p-3 mt-10 justify-center bg-Fondo  w-[120px] h-[177px]" key={index}>
        <h5 className="text-md ">{day}, {dayOfMonth} {month}</h5>
        <div className="flex items-center justify-center"> 
          {weatherIcon && <img src={weatherIcon} alt="icon" className="w-20 h-16 mt-2" />} 
        </div>
        <div className="mt-8 flex  justify-between items-end "> 
          <h5 className="text-md">{maxTemp}&deg;</h5>
          <h5 className="text-md">{minTemp}&deg;</h5>
        </div>
      </div>
      );
    })}
  </div>
) : (
  <div className="text-red-500">No Data Found</div>
)}
  <>
    {citySearchData && citySearchData.error ? (
      <div className="text-red-500">{citySearchData.error}</div>
    ) : (
      <>
        {forecastError ? (
          <div className="text-red-500">{forecastError}</div>
        ) : (
          <>
          
            {citySearchData && citySearchData.data ? (
              <div className="text-barraHumedad mt-28 ">
                <h1 className=" text-barraHumedad text-4xl">Todays Hightlights</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center place-items-center">
                <div className="bg-Fondo text-center my-5 w-[328px] h-[204px]">
                  <h2 className="mt-7 ">Wind status</h2>
                  <h1 className="text-white w-48 h-40 text-7xl  font-Raleway inline-block" >
                  {Math.round(citySearchData.data.wind.speed)}
                  <span className="text-gray-400 text-4xl ml-1  font-Raleway">mph</span>
                             </h1>
                  
                  
                </div>
            
                <div className="bg-Fondo text-center my-5 w-[328px] h-[204px]">
                  <h2 className="text-barraHumedad mt-7">Humidity</h2>
                  <h1 className="text-white w-48 h-20 text-7xl  font-Raleway inline-block" >
                  {citySearchData.data.main.humidity}
                  <span className="text-gray-400 text-4xl ml-1  font-Raleway">%</span>
                  </h1>
                  <div className="flex justify-center items-center flex-col">
  <div className="flex justify-between w-[229px]">
    <span className="text-sm text-gray-400">0</span>
    <span className="text-sm text-gray-400">50</span>
    <span className="text-sm text-gray-400">100</span>
  </div>
  <div className="w-[229px] h-2 bg-barraHumedad rounded-full relative ">
    <div className="absolute top-0 left-0 h-full rounded-full bg-humedad" style={{ width: `${citySearchData.data.main.humidity}%` }}></div>
  </div>
</div>
                  
                </div>
            
                <div className="bg-Fondo text-center my-5 w-[328px] h-[160px]">
                  <h2 className="text-barraHumedad mt-7">Visibility</h2>
                  <h1 className="text-white w-48 h-20 text-7xl  font-Raleway inline-block" >
                  {(citySearchData.data.visibility * 0.000621371).toFixed(1)}
                  <span className="text-gray-400 text-4xl ml-1  font-Raleway">miles</span>
                  </h1>
                  
                </div>
            
                <div className="bg-Fondo text-center my-5 w-[328px] h-[160px]">
  <h2 className="text-barraHumedad mt-7">Pressure</h2>
  <div className="flex items-center justify-center">
    <h1 className="text-white w-48 h-20 text-7xl font-Raleway inline-block">
      {citySearchData.data.main.pressure}
    </h1>
    <span className="text-gray-400 text-3xl ml-1 font-Raleway">mb</span>
  </div>
</div>
              </div>
            </div>
            ) : (
              <div className="text-red-500">No Data Found</div>
            )}
          </>
        )}
      </>
    )}
  </>
</section>
        
      </div>
    </div>
  );
}

export default App;