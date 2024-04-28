
import './App.css'
import React, { useEffect, useState } from "react";
import Information from './components/Information'
import Temperature from './components/Temperature'


function App() {
  const  [city ,setCity]= useState("New Delhi");
  const[weatherData , setWeatherData]=useState(null);
  
  useEffect(()=>{
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=4b12f51987f44cb69a2171016242804&q=${city}&aqi=no`;
  fetch(apiURL)
  .then((response)=>{
    if(!response.ok){
      throw new Error("Error");
    }
   return  response.json();
  })
  .then((data)=>{
    console.log(data);
    setWeatherData(data);
  })
  .catch((e)=>{
    console.log(e);
  });
},[city]);
  return (
    //background
    <div className='bg-[#1F213A] h-screen flex  justify-center align-top'>
      <div className=' mt-40 w-1/5 h-1/3'> 
      {weatherData && (
      <Temperature
      setCity={setCity}
      stats={{
        temp:weatherData.current.temp_c,
        condition:weatherData.current.condition.text,
        isDay:weatherData.current.is_day,
        location:weatherData.location.name,
        time:weatherData.location.localtime
      }}
      />
      )}
      </div>
     
      <div className=' mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
        <h2 className='text-slate-200 text-2xl col-span-2'>
        Today's HighLights</h2>
        {
          weatherData && (
          <>
          <Information
          stats={{
            title:"Wind Status",
            value:weatherData.current.wind_mph,
            unit:"mph",
            direction:weatherData.current.wind_dir
          }}
          />
          
        <Information
         stats={{
          title:"Humidity",
          value:weatherData.current.humidity,
          unit:"%",
         
        }}
        />
       
        <Information
        stats={{
          title:"Visibility",
          value:weatherData.current.vis_miles,
          unit:"miles",
        
        }}
        />
        
        <Information
        stats={{
          title:"Air Pressure",
          value:weatherData.current.pressure_mb,
          unit:"mb",
          
        }}
        />
        
          </>
        )}
        
        </div>
    </div>
  );
}

export default App
