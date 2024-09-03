import React from 'react';

function Information({ stats }) {
  return (
    // Container styling with a background, padding, and text alignment
    <div className='bg-slate-600 p-2 text-slate-200 flex flex-col justify-start items-center'>
      
      {/* Title of the information section, e.g., "Wind Status" */}
      <h2 className='text-sm mt-2 font-semibold'>{stats.title}</h2>
      
      {/* Display the main value and unit, e.g., wind speed and unit */}
      <div className='mt-2'>
        {" "}
        <span className='text-4xl font-bold'>{stats.value}</span>
        <span className='text-2xl'>{stats.unit}</span>
      </div>

      {/* Conditional rendering for wind direction; only shows if direction is available */}
      {stats.direction ? (
        <div className='mt-2 flex mb-1'>
          {/* SVG icon representing the wind direction */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-slate-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          {/* Displaying the wind direction text */}
          <div className='ms-2.5 text-slate-200'>{stats.direction}</div>
        </div>
      ) : null}

      {/* Conditional rendering for the humidity bar; only shows when the title is "Humidity" */}
      {stats.title === "Humidity" ? (
        <div className="w-full mt-4 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          {/* Progress bar representing the humidity level */}
          <div
            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
            style={{ width: '45%' }} // Example width; adjust according to the actual humidity value
          ></div>
        </div>
      ) : null}
    </div>
  );
}

export default Information;
