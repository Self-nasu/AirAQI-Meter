import React, { useState, useEffect } from 'react';
import './style.css';

function LiveFeed({ value }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (value >= 0 && value < 50) {
      setStatus('Good');
    } else if (value >= 50 && value < 100) {
      setStatus('Moderate');
    } else if (value >= 100 && value < 200) {
      setStatus('Poor');
    } else if (value >= 200 && value < 300) {
      setStatus('Unhealthy');
    } else if (value >= 300 && value < 400) {
      setStatus('Severe');
    } else if (value > 400) {
      setStatus('Hazardous');
    }
  }, [value]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <div className='d-flex gap-3'>
        <div className="container-fluid animate__animated animate__fadeInDown w-25 px-3 cust-border py-3 bg-light text-center shadow-sm d-flex flex-column flex-md-row cust-rounded justify-content-center align-items-center">
          <div className="d-flex flex-column align-items-center justify-content-center text-start mb-3 mb-md-0">
            <p className="h3 m-0 text-light">{timeString}</p>
            <p className="h6 date text-light-dim m-0">{dateString}</p>
          </div>
        </div>

        <div className="container-fluid  animate__animated animate__fadeInDown animate__delay-1s w-75 px-3 cust-border py-3 bg-light shadow-sm d-flex flex-column flex-md-row cust-rounded justify-content-between align-items-center">
          <div className="d-flex flex-column align-items-center align-items-md-start mb-3 mb-md-0">
            <div id='live-tag' className="h6 text-danger m-0 d-flex justify-content-center align-items-center">
              <div className="circle-it me-1"></div>Live
            </div>
            <p className="h1 text-shadow m-0 text-light">AQI {value}</p>
          </div>

          <div className="d-flex animate__animated animate__flipInX animate__delay-2s justify-content-center">
            <div className="cust-rounded  cust-border bg-cust shadow-sm d-flex align-items-center px-4 py-2">
              <p className="h2 text-shadow m-0 px-3 text-light py-2">{status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveFeed;
